# Create a function to generate a data science profile plot
create_ds_profile <- function(skills) {
  # Create the data frame
  df <- data.frame(
    Domain = c("Data Viz", "Machine Learning", "Mathematics", 
               "Statistics", "Computer Science", "Communication",
               "Domain Expertise"),
    Level = skills
  )
  
  # Set up the plotting parameters
  par(mar = c(8, 4, 4, 2) + 0.1)  # Increase bottom margin for labels
  
  # Create the bar plot
  barplot(df$Level,
          names.arg = df$Domain,
          col = "skyblue",
          main = "My Data Science Profile\nDigital Marketing & SEO Focus",
          las = 2,          # Rotate labels
          ylim = c(0, 10),  # Set y-axis limits
          border = "white",
          cex.names = 0.8)  # Adjust text size
  
  # Add grid lines
  abline(h = seq(0, 10, by = 2), col = "gray", lty = 2)
  
  # Add y-axis label
  mtext("Skill Level (Relative Scale)", side = 2, line = 2.5)
}

# Your personal assessment
my_skills <- c(6, 7, 6, 5, 9, 8, 9)  # Updated with your values

# Create the profile
create_ds_profile(my_skills)

# Print summary of strengths
cat("\nProfile Highlights:\n")
cat("Strongest Areas:\n")
cat("- Domain Expertise (9/10): Extensive experience in Digital Marketing & SEO\n")
cat("- Computer Science (9/10): Strong technical foundation\n")
cat("- Communication (8/10): Effective technical communication skills\n")
cat("\nAreas for Growth:\n")
cat("- Statistics (5/10): Opportunity to strengthen statistical foundations\n")
