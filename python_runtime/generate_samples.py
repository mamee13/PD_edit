from fpdf import FPDF

def create_pdf(filename, text):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("helvetica", size=12)
    pdf.cell(text=text)
    pdf.output(filename)

if __name__ == "__main__":
    create_pdf("sample1.pdf", "This is sample 1")
    create_pdf("sample2.pdf", "This is sample 2")
    print("Created sample1.pdf and sample2.pdf")
