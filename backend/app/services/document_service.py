import io
from fastapi import UploadFile, HTTPException
from pypdf import PdfReader
import docx

class DocumentService:
    def extract_text_from_file(self, file: UploadFile) -> str:
        filename = file.filename or ""
        filename_lower = filename.lower()
        contents = file.file.read()

        if filename_lower.endswith(".pdf"):
            return self._extract_pdf(contents)
        elif filename_lower.endswith(".docx"):
            return self._extract_docx(contents)
        elif filename_lower.endswith(".txt"):
            return contents.decode("utf-8", errors="ignore")
        else:
            # Fallback: attempt text decode
            try:
                return contents.decode("utf-8", errors="ignore")
            except Exception:
                raise HTTPException(
                    status_code=400,
                    detail="Unsupported file format. Please upload a PDF (.pdf), Word document (.docx), or plain text file (.txt)."
                )

    def _extract_pdf(self, pdf_bytes: bytes) -> str:
        try:
            reader = PdfReader(io.BytesIO(pdf_bytes))
            text_blocks = []
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text_blocks.append(page_text)
            extracted = "\n".join(text_blocks).strip()
            if not extracted:
                raise HTTPException(status_code=400, detail="Could not extract text from PDF. The PDF may contain scanned images without text.")
            return extracted
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to read PDF file: {str(e)}")

    def _extract_docx(self, docx_bytes: bytes) -> str:
        try:
            doc = docx.Document(io.BytesIO(docx_bytes))
            text_blocks = [p.text for p in doc.paragraphs if p.text.strip()]
            extracted = "\n".join(text_blocks).strip()
            if not extracted:
                raise HTTPException(status_code=400, detail="Document appears to be empty.")
            return extracted
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to read Word document: {str(e)}")

document_service = DocumentService()
