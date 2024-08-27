<script>
  document.getElementById(&#39;downloadPdfBtn&#39;).addEventListener(&#39;click&#39;, function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const descriptionContent = document.querySelector(&#39;.detailDescription.remove_style&#39;).innerText;
    const marginLeft = 20;
    const marginTop = 20;
    const lineHeight = 5;
    const pageWidth = doc.internal.pageSize.getWidth() - marginLeft * 2;
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = marginTop;

    const lines = doc.splitTextToSize(descriptionContent, pageWidth);

    lines.forEach((line, index) =&gt; {
      if (yPosition + lineHeight &gt; pageHeight) {
        doc.addPage();
        yPosition = marginTop;
      }
      doc.text(line, marginLeft, yPosition);
      yPosition += lineHeight;
    });

    // Download PDF dengan nama &#39;deskripsi_produk.pdf&#39;
    doc.save(&#39;deskripsi_produk.pdf&#39;);
  });
</script>
