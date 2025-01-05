# Enhanced CLT Visualization with Multiple Sample Sizes
library(ggplot2)
library(gridExtra)
library(cowplot)
library(dplyr)

# Generate chi-square population
set.seed(123)
n_pop <- 1000000
population <- rchisq(n_pop, df = 2)

# Function to generate sample means for different sample sizes
generate_means <- function(n_size, n_samples = 1000) {
  means <- numeric(n_samples)
  for(i in 1:n_samples) {
    means[i] <- mean(sample(population, size = n_size))
  }
  return(data.frame(
    means = means,
    size = paste("n =", n_size)
  ))
}

# Generate means for different sample sizes
sample_sizes <- c(10, 30, 50)
all_means <- do.call(rbind, lapply(sample_sizes, generate_means))

# Create QQ plots data
qq_data <- lapply(sample_sizes, function(n) {
  means <- generate_means(n)$means
  theoretical <- qnorm(ppoints(length(means)), 
                      mean = mean(means), 
                      sd = sd(means))
  data.frame(
    observed = sort(means),
    theoretical = theoretical,
    size = paste("n =", n)
  )
})
qq_data <- do.call(rbind, qq_data)

# Create plots
# Population distribution
pop_plot <- ggplot(data.frame(x = population), aes(x = x)) +
  geom_density(fill = "#ff4444", alpha = 0.5) +
  geom_vline(xintercept = mean(population), 
             color = "#ffffff", 
             linetype = "dashed") +
  annotate("text", 
           x = mean(population), 
           y = 0.5, 
           label = sprintf("μ = %.2f", mean(population)),
           color = "#ffffff",
           angle = 90,
           vjust = -1) +
  labs(title = "Population Distribution (χ²[2])",
       x = "Value",
       y = "Density") +
  theme_minimal() +
  theme(
    plot.background = element_rect(fill = "#1a1a1a", color = NA),
    panel.background = element_rect(fill = "#1a1a1a", color = NA),
    text = element_text(color = "#ffffff"),
    axis.text = element_text(color = "#ffffff"),
    panel.grid = element_line(color = "#333333")
  )

# Sampling distributions
means_plot <- ggplot(all_means, aes(x = means)) +
  geom_density(fill = "#4444ff", alpha = 0.5) +
  facet_wrap(~size, ncol = 1) +
  geom_vline(data = aggregate(means ~ size, all_means, mean),
             aes(xintercept = means),
             color = "#ffffff",
             linetype = "dashed") +
  labs(title = "Sampling Distributions",
       x = "Sample Mean",
       y = "Density") +
  theme_minimal() +
  theme(
    plot.background = element_rect(fill = "#1a1a1a", color = NA),
    panel.background = element_rect(fill = "#1a1a1a", color = NA),
    text = element_text(color = "#ffffff"),
    axis.text = element_text(color = "#ffffff"),
    panel.grid = element_line(color = "#333333"),
    strip.background = element_rect(fill = "#333333"),
    strip.text = element_text(color = "#ffffff")
  )

# QQ plots
qq_plot <- ggplot(qq_data, aes(x = theoretical, y = observed)) +
  geom_point(color = "#4444ff", alpha = 0.5) +
  geom_abline(slope = 1, intercept = 0, 
              color = "#ffffff", 
              linetype = "dashed") +
  facet_wrap(~size, ncol = 1) +
  labs(title = "Normal Q-Q Plots",
       x = "Theoretical Quantiles",
       y = "Sample Quantiles") +
  theme_minimal() +
  theme(
    plot.background = element_rect(fill = "#1a1a1a", color = NA),
    panel.background = element_rect(fill = "#1a1a1a", color = NA),
    text = element_text(color = "#ffffff"),
    axis.text = element_text(color = "#ffffff"),
    panel.grid = element_line(color = "#333333"),
    strip.background = element_rect(fill = "#333333"),
    strip.text = element_text(color = "#ffffff")
  )

# Arrange plots
combined_plots <- plot_grid(
  pop_plot, 
  means_plot, 
  qq_plot, 
  ncol = 1,
  rel_heights = c(1, 3, 3)
)

# Save final plot
ggsave("enhanced_clt_analysis.png", 
       combined_plots, 
       width = 10, 
       height = 15, 
       dpi = 300,
       bg = "#1a1a1a")

# Print summary statistics for each sample size
cat("\nSummary Statistics:\n")
for(size in sample_sizes) {
  means <- generate_means(size)$means
  cat(sprintf("\nSample Size %d:", size))
  cat(sprintf("\n  Mean: %.3f", mean(means)))
  cat(sprintf("\n  SD: %.3f", sd(means)))
  cat(sprintf("\n  Theoretical SE: %.3f", sqrt(2*2/size)))
  cat(sprintf("\n  Empirical SE: %.3f\n", sd(means)))
}