# Beach Comber Patron Ages Analysis
# Create the data vector
patron_ages <- c(25, 19, 37, 29, 40, 28, 31)

# Step 1: State the hypotheses
# H0: μ = 21 (null hypothesis)
# Ha: μ ≠ 21 (alternative hypothesis)

# Step 2: State significance level (commonly 0.05)
alpha <- 0.05

# Step 3: Calculate test statistic and other relevant statistics
sample_mean <- mean(patron_ages)
sample_sd <- sd(patron_ages)
sample_size <- length(patron_ages)

# Perform one-sample t-test
t_test_result <- t.test(patron_ages, mu = 21)

# Step 4: Find the p-value
p_value <- t_test_result$p.value

# Step 5: Make decision
decision <- ifelse(p_value < alpha, "Reject H0", "Fail to reject H0")

# Print results
print("Sample Statistics:")
print(paste("Sample Mean:", round(sample_mean, 2)))
print(paste("Sample Standard Deviation:", round(sample_sd, 2)))
print(paste("Sample Size:", sample_size))
print("\nT-Test Results:")
print(t_test_result)
print(paste("\nDecision:", decision))

# Create visualization
par(mfrow=c(1,2)) # Set up 2 plots side by side

# Boxplot
boxplot(patron_ages, main="Boxplot of Patron Ages", 
        ylab="Age", ylim=c(15, 45))
abline(h=21, col="red", lty=2) # Add reference line for H0
text(1.3, 21, "H0: μ = 21", col="red")

# Histogram with normal curve
hist(patron_ages, main="Histogram of Patron Ages", 
     xlab="Age", prob=TRUE, ylim=c(0, 0.06))
curve(dnorm(x, mean=mean(patron_ages), sd=sd(patron_ages)), 
      add=TRUE, col="blue", lwd=2)
abline(v=21, col="red", lty=2) # Add reference line for H0
abline(v=mean(patron_ages), col="blue", lty=2) # Add sample mean line
