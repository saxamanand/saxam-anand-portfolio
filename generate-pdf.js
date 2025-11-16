document.addEventListener('DOMContentLoaded', function() {
    // Get the download resume button
    const downloadResumeBtn = document.querySelector('a[href="assets/saxam-anand-resume.pdf"]');
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Open the HTML resume in a new window
            const resumeWindow = window.open('assets/saxam-anand-resume.html', '_blank');
            
            // Wait for the resume window to load
            resumeWindow.addEventListener('load', function() {
                // Hide the print button in the resume window
                const printBtn = resumeWindow.document.querySelector('.no-print');
                if (printBtn) {
                    printBtn.style.display = 'none';
                }
                
                // Generate PDF from the HTML content
                const element = resumeWindow.document.querySelector('.resume-container');
                const opt = {
                    margin: 10,
                    filename: 'saxam-anand-resume.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                
                // Use html2pdf library to generate and download the PDF
                resumeWindow.html2pdf().from(element).set(opt).save().then(function() {
                    // Close the resume window after PDF is generated
                    setTimeout(function() {
                        resumeWindow.close();
                    }, 1000);
                });
            });
        });
    }
});