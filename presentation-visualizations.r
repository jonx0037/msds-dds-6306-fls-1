# Required libraries
library(ggplot2)
library(gridExtra)
library(dplyr)
library(scales)

# Set theme for all plots
custom_theme <- theme_minimal() +
  theme(
    plot.background = element_rect(fill = "#1a1a1a", color = NA),
    panel.background = element_rect(fill = "#1a1a1a", color = NA),
    text = element_text(color = "white"),
    axis.text = element_text(color = "white"),
    axis.title = element_text(color = "white", size = 12),
    legend.text = element_text(color = "white"),
    legend.title = element_text(color = "white"),
    panel.grid.major = element_line(color = "#333333"),
    panel.grid.minor = element_line(color = "#222222"),
    plot.title = element_text(size = 16, face = "bold", color = "white"),
    legend.background = element_rect(fill = "#1a1a1a")
  )

# 1. Data Science Profile Plot
ds_profile <- data.frame(
  Skill = c("Data Viz", "Machine Learning", "Mathematics", 
            "Statistics", "Computer Science", "Communication",
            "Domain Expertise"),
  Level = c(6, 7, 6, 5, 9, 8, 9)
)

profile_plot <- ggplot(ds_profile, aes(x = reorder(Skill, -Level), y = Level)) +
  geom_bar(stat = "identity", fill = "#4444ff", alpha = 0.8) +
  coord_flip() +
  scale_y_continuous(limits = c(0, 10), breaks = 0:10) +
  labs(
    title = "Data Science Profile",
    x = "",
    y = "Skill Level"
  ) +
  custom_theme

# 2. CLT Visualization
# Generate chi-square population
set.seed(123)
n_pop <- 100000
population <- rchisq(n_pop, df = 2)
sample_means <- numeric(1000)

# Generate sample means
for(i in 1:1000) {
  sample_means[i] <- mean(sample(population, size = 50))
}

# Create data frames for density plots
pop_df <- data.frame(value = population)
means_df <- data.frame(value = sample_means)

# Population density plot
pop_plot <- ggplot(pop_df, aes(x = value)) +
  geom_density(fill = "#ff4444", alpha = 0.5) +
  labs(
    title = "Population Distribution (Chi-square df=2)",
    x = "Value",
    y = "Density"
  ) +
  custom_theme

# Sample means density plot
means_plot <- ggplot(means_df, aes(x = value)) +
  geom_density(fill = "#4444ff", alpha = 0.5) +
  labs(
    title = "Sampling Distribution of Means (n=50)",
    x = "Sample Mean",
    y = "Density"
  ) +
  custom_theme

# 3. Beach Comber T-Test Visualization
patron_ages <- c(25, 19, 37, 29, 40, 28, 31)
age_df <- data.frame(
  Patron = factor(1:length(patron_ages)),
  Age = patron_ages
)

ttest_plot <- ggplot(age_df, aes(x = Patron, y = Age)) +
  geom_bar(stat = "identity", fill = "#8884d8", alpha = 0.8) +
  geom_hline(yintercept = 21, color = "#ff4444", linetype = "dashed", size = 1) +
  geom_hline(yintercept = mean(patron_ages), color = "#44ff44", linetype = "dashed", size = 1) +
  annotate("text", x = 1, y = 21.5, label = "H₀: μ = 21", color = "#ff4444", hjust = 0) +
  annotate("text", x = 1, y = mean(patron_ages) + 0.5, 
           label = paste("x̄ =", round(mean(patron_ages), 1)), 
           color = "#44ff44", hjust = 0) +
  scale_y_continuous(limits = c(15, 45)) +
  labs(
    title = "Beach Comber Patron Ages",
    x = "Patron",
    y = "Age"
  ) +
  custom_theme

# Save plots with high resolution
# Note: Adjust width and height as needed for your PowerPoint template
ggsave("ds_profile.png", profile_plot, width = 10, height = 6, dpi = 300)
ggsave("clt_population.png", pop_plot, width = 10, height = 6, dpi = 300)
ggsave("clt_sampling.png", means_plot, width = 10, height = 6, dpi = 300)
ggsave("ttest_plot.png", ttest_plot, width = 10, height = 6, dpi = 300)

# Create combined CLT plot
combined_clt <- grid.arrange(pop_plot, means_plot, ncol = 1)
ggsave("combined_clt.png", combined_clt, width = 10, height = 12, dpi = 300)

# Print summary statistics for reference
cat("\nCLT Analysis Summary:")
cat("\nPopulation Mean:", mean(population))
cat("\nPopulation SD:", sd(population))
cat("\nSample Means Mean:", mean(sample_means))
cat("\nSample Means SD:", sd(sample_means))
cat("\nTheoretical SE:", sd(population)/sqrt(50))

cat("\n\nT-Test Results:")
t_test_result <- t.test(patron_ages, mu = 21)
print(t_test_result)