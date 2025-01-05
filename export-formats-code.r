# Add these libraries for additional export capabilities
library(svglite)  # For SVG export
library(Cairo)    # For enhanced PDF and PNG quality
library(webshot)  # For HTML to PDF conversion if needed

# Function to export a plot in multiple formats
export_plot <- function(plot, filename_base, width = 10, height = 6) {
  # PNG export (standard and retina resolution)
  ggsave(paste0(filename_base, "_standard.png"), 
         plot, 
         width = width, 
         height = height, 
         dpi = 300,
         bg = "#1a1a1a")
  
  ggsave(paste0(filename_base, "_retina.png"), 
         plot, 
         width = width, 
         height = height, 
         dpi = 600,
         bg = "#1a1a1a")
  
  # PDF export (vector format, great for scaling)
  ggsave(paste0(filename_base, ".pdf"), 
         plot, 
         width = width, 
         height = height, 
         device = cairo_pdf,
         bg = "#1a1a1a")
  
  # SVG export (vector format, web-friendly)
  ggsave(paste0(filename_base, ".svg"), 
         plot, 
         width = width, 
         height = height, 
         device = "svg",
         bg = "#1a1a1a")
  
  # TIFF export (high quality, good for printing)
  ggsave(paste0(filename_base, ".tiff"), 
         plot, 
         width = width, 
         height = height, 
         device = "tiff", 
         dpi = 300,
         compression = "lzw",
         bg = "#1a1a1a")
  
  # EPS export (vector format, good for scientific publications)
  ggsave(paste0(filename_base, ".eps"), 
         plot, 
         width = width, 
         height = height, 
         device = "eps",
         bg = "#1a1a1a")
}

# Export all plots in multiple formats
# Data Science Profile
export_plot(profile_plot, "ds_profile")

# CLT Population Plot
export_plot(pop_plot, "clt_population")

# CLT Sampling Distribution Plot
export_plot(means_plot, "clt_sampling")

# Combined CLT Plot (adjust height for two plots)
export_plot(combined_clt, "combined_clt", height = 12)

# T-Test Plot
export_plot(ttest_plot, "ttest_plot")