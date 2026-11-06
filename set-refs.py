#!/usr/bin/env python3
"""Insert referee phone numbers into resume-ai.tex and rebuild resume-ai.pdf.

Usage: python3 set-refs.py [LEA_PHONE] [OSURA_PHONE]   (prompts for any not given)
"""
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
TEX = HERE / "resume-ai.tex"
REFS = [("leaphone", "Lea Beistroff"), ("osuraphone", "Osura Dissanayake")]


def set_phone(tex, macro, phone):
    # Escape LaTeX specials so a stray char can't break the build.
    phone = re.sub(r"([&%$#_{}])", r"\\\1", phone.strip())
    pattern = r"(\\newcommand\{\\%s\}\{)[^}\n]*(\})" % macro
    new, n = re.subn(pattern, lambda m: m.group(1) + phone + m.group(2), tex)
    if n != 1:
        sys.exit(f"Could not find \\{macro} in {TEX.name}")
    return new


def main():
    args = sys.argv[1:]
    tex = TEX.read_text()
    for i, (macro, name) in enumerate(REFS):
        phone = args[i] if i < len(args) else input(f"{name}'s phone (blank to skip): ")
        if phone.strip():
            tex = set_phone(tex, macro, phone)
    TEX.write_text(tex)

    with tempfile.TemporaryDirectory() as out:
        r = subprocess.run(["pdflatex", "-interaction=nonstopmode", "-halt-on-error",
                            f"-output-directory={out}", str(TEX)], capture_output=True, text=True)
        if r.returncode:
            sys.exit(r.stdout[-2000:])
        shutil.copy(Path(out) / "resume-ai.pdf", HERE / "resume-ai.pdf")
    print("Updated resume-ai.tex and rebuilt resume-ai.pdf")


if __name__ == "__main__":
    main()
