import argparse
from pathlib import Path
import sys
import re
from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from PIL import Image, ImageDraw, ImageFont


_slug_re = re.compile(r"[^a-z0-9-]+")


def slugify(s: str) -> str:
    s = s.strip().lower()
    s = re.sub(r"\s+", "-", s)
    s = _slug_re.sub("-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "case-study"


def prompt_existing_docx(base_dir: Path) -> Path:
    name = input("DOCX filename (in this folder): ").strip().strip('"').strip("'")
    if not name:
        print("No filename provided. Aborting.")
        sys.exit(1)

    if not name.lower().endswith(".docx"):
        name = name + ".docx"

    p = (base_dir / name).resolve()

    if not p.exists():
        print(f"File not found: {p}")
        sys.exit(1)

    return p


def prompt_slug(suggested: str) -> str:
    s = input(f"Slug [{suggested}]: ").strip()
    return suggested if s == "" else slugify(s)


def is_heading_level(paragraph: Paragraph) -> int | None:
    """
    Detect Word 'Heading 1..6' styles.
    """
    style_name = (paragraph.style.name if paragraph.style else "") or ""
    m = re.match(r"Heading\s+([1-6])\b", style_name, flags=re.IGNORECASE)
    if m:
        return int(m.group(1))
    return None


def paragraph_has_image(paragraph: Paragraph) -> bool:
    """
    Detect inline pictures (common case) within a paragraph via a:blip.
    """
    # Any run with a:blip indicates a picture reference
    for run in paragraph.runs:
        blips = run._r.xpath(".//*[local-name()='blip']")
        if blips:
            return True
    return False


def iter_block_items(doc: Document):
    """
    Yield Paragraph and Table objects in the order they appear in the document.
    """
    body = doc.element.body
    for child in body.iterchildren():
        if child.tag.endswith("}p"):
            yield Paragraph(child, doc)
        elif child.tag.endswith("}tbl"):
            yield Table(child, doc)


def preview_text(s: str, n: int = 120) -> str:
    s = (s or "").replace("\n", " ").strip()
    if len(s) <= n:
        return s
    return s[:n - 1] + "…"


def paragraph_image_rids(paragraph: Paragraph) -> list[str]:
    """
    Return relationship IDs (rIdX) for inline images in this paragraph, in order.
    """
    rids: list[str] = []
    for run in paragraph.runs:
        blips = run._r.xpath(".//*[local-name()='blip']")
        for b in blips:
            rid = b.get(
                "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed"
            )
            if rid:
                rids.append(rid)
    return rids


def extract_image_bytes(doc: Document, rid: str) -> tuple[bytes, str] | None:
    """
    Returns (bytes, ext) for an image relationship id, or None.
    """
    rel = doc.part.rels.get(rid)
    if not rel or rel.reltype != RT.IMAGE:
        return None

    part = rel.target_part
    data = part.blob
    name = Path(str(part.partname)).name  # e.g. image1.png
    ext = Path(name).suffix.lower().lstrip(".") or "png"
    return data, ext


def clean_heading_text(text: str) -> str:
    """
    Remove leading emojis/symbols and extra decoration from headings.
    """
    t = (text or "").strip()
    # remove leading emojis / symbols
    t = re.sub(r"^[^\wA-Za-z]+", "", t)
    # collapse spaces
    t = re.sub(r"\s{2,}", " ", t)
    return t.strip()


def list_prefix(paragraph: Paragraph) -> str:
    pPr = paragraph._p.pPr
    if pPr is None or pPr.numPr is None:
        return ""

    style = (paragraph.style.name or "").lower() if paragraph.style else ""

    if "bullet" in style:
        return "- "

    if "number" in style:
        return "1. "

    # fallback: unknown list → bullet
    return "- "


def render_table_png(table: Table, out_path: Path) -> None:
    """
    Render a Word table to a simple PNG (grid + text). Deterministic, no Word rendering.
    """
    font = ImageFont.load_default()
    padding_x = 10
    padding_y = 6
    border = 2

    rows = len(table.rows)
    cols = len(table.columns) if rows else 0
    if rows == 0 or cols == 0:
        # empty table -> tiny placeholder
        img = Image.new("RGB", (200, 60), "white")
        d = ImageDraw.Draw(img)
        d.text((10, 20), "[Empty table]", font=font, fill="black")
        img.save(out_path)
        return

    # Collect cell texts
    data: list[list[str]] = []
    for r in range(rows):
        row_vals: list[str] = []
        for c in range(cols):
            t = (table.cell(r, c).text or "").replace("\n", " ").strip()
            row_vals.append(t)
        data.append(row_vals)

    # Measure text sizes to compute column widths
    dummy = Image.new("RGB", (10, 10), "white")
    d = ImageDraw.Draw(dummy)

    def text_size(s: str) -> tuple[int, int]:
        bbox = d.textbbox((0, 0), s, font=font)
        return (bbox[2] - bbox[0], bbox[3] - bbox[1])

    col_widths = [0] * cols
    row_heights = [0] * rows

    for r in range(rows):
        max_h = 0
        for c in range(cols):
            w, h = text_size(data[r][c] if data[r][c] else " ")
            col_widths[c] = max(col_widths[c], w)
            max_h = max(max_h, h)
        row_heights[r] = max_h

    # Add padding
    col_widths = [w + 2 * padding_x for w in col_widths]
    row_heights = [h + 2 * padding_y for h in row_heights]

    width = sum(col_widths) + border * 2
    height = sum(row_heights) + border * 2

    img = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(img)

    # Outer border
    draw.rectangle([0, 0, width - 1, height - 1], outline="black", width=border)

    y = border
    for r in range(rows):
        x = border
        for c in range(cols):
            cell_w = col_widths[c]
            cell_h = row_heights[r]
            # Cell border
            draw.rectangle([x, y, x + cell_w, y + cell_h], outline="black", width=1)
            # Text
            text = data[r][c]
            draw.text((x + padding_x, y + padding_y), text, font=font, fill="black")
            x += cell_w
        y += row_heights[r]

    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--project",
        default=".",
        help="Repo root (contains src/). If omitted, defaults to the parent of the current folder.",
    )
    args = ap.parse_args()

    # You run from "<project>/MD convert"
    project = Path(args.project).expanduser().resolve()
    if args.project == ".":
        project = Path.cwd().parent.resolve()

    if not (project / "src").exists():
        print(f"Project root missing src/: {project}")
        sys.exit(1)

    inbox_dir = Path.cwd()  # MD convert
    docx_path = prompt_existing_docx(inbox_dir)

    suggested = slugify(docx_path.stem)
    slug = prompt_slug(suggested)
    md_out = project / "src" / "content" / "case-studies" / "md" / f"{slug}.md"
    img_out_dir = project / "src" / "assets" / "case-studies" / slug
    img_out_dir.mkdir(parents=True, exist_ok=True)

    print("\n--- Inputs ---")
    print(f"Project: {project}")
    print(f"Input:   {docx_path}")
    print(f"Slug:    {slug}")

    print("\n--- DOCX structure (in order) ---")
    doc = Document(str(docx_path))

    preview_dir = (project / "MD convert" / "_extract_preview" / slug).resolve()
    preview_dir.mkdir(parents=True, exist_ok=True)

    para_count = 0
    table_count = 0
    image_para_count = 0
    nonempty_para_count = 0
    image_count = 0

    idx = 0
    md_lines: list[str] = []

    stop_output = False

    for item in iter_block_items(doc):
        idx += 1
        if isinstance(item, Paragraph):
            txt = item.text or ""

            if txt.strip().lower().startswith("written by yair riffkin"):
                stop_output = True

            if stop_output:
                continue

            para_count += 1
            has_img = paragraph_has_image(item)
            if has_img:
                image_para_count += 1
            if txt.strip():
                nonempty_para_count += 1

            h = is_heading_level(item)
            if h:
                print(
                    f"{idx:03d}. HEADING{h}  "
                    f"img={str(has_img):5s}  "
                    f"{preview_text(clean_heading_text(txt))}"
                )
                md_lines.append("")
                md_lines.append("")

                md_lines.append(f"{'#' * h} {clean_heading_text(txt)}")

                md_lines.append("")
            else:
                print(f"{idx:03d}. PARA      img={str(has_img):5s}  {preview_text(txt)}")
                if txt.strip():
                    prefix = list_prefix(item)
                    md_lines.append(f"{prefix}{txt.strip()}")
                    md_lines.append("")

            for rid in paragraph_image_rids(item):
                extracted = extract_image_bytes(doc, rid)
                if not extracted:
                    print(f"[ERROR] Unsupported image relationship: {rid}")
                    sys.exit(1)

                data, ext = extracted
                image_count += 1
                filename = f"img-{image_count:03d}.{ext}"
                (img_out_dir / filename).write_bytes(data)

                md_lines.append(f"![](/src/assets/case-studies/{slug}/{filename})")
                md_lines.append("")

                print(f"      [IMG] #{image_count:03d} -> {filename}")

        elif isinstance(item, Table):
            table_count += 1
            rows = len(item.rows)
            cols = len(item.columns) if rows > 0 else 0
            print(f"{idx:03d}. TABLE     {rows}x{cols}")

            # render table to image and insert exactly here
            table_filename = f"tbl-{table_count:03d}.png"
            render_table_png(item, img_out_dir / table_filename)

            md_lines.append(f"![](/src/assets/case-studies/{slug}/{table_filename})")
            md_lines.append("")

    print("\n--- Summary ---")
    print(f"Blocks:            {idx}")
    print(f"Paragraphs:        {para_count} (non-empty: {nonempty_para_count})")
    print(f"Tables:            {table_count}")
    print(f"Paras with images: {image_para_count}")

    md_out.write_text("\n".join(md_lines).strip() + "\n", encoding="utf-8")
    print(f"\nMarkdown written to: {md_out}")

    if nonempty_para_count == 0 and table_count == 0:
        print("\nERROR: Document contains no convertible content.")
        sys.exit(1)


if __name__ == "__main__":
    main()
