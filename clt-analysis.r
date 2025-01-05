# Control Parameters
n = 50  # sample size per sample
simulations = 10000  # number of samples/xbars we will generate
df = 2  # degrees of freedom for chi-square distribution

# Generate population
population = rchisq(10000000, df = df)

# Calculate theoretical values
theoretical_mean = df  # For chi-square, mean equals df
theoretical_sd = sqrt(2 * df)  # For chi-square, variance equals 2*df
theoretical_se = theoretical_sd/sqrt(n)  # Standard error for means

# Vector to hold sample means
xbar_holder = numeric(simulations)

# Generate sample means
for (i in 1:simulations) {
    sample = sample(population, n)
    xbar = mean(sample)
    xbar_holder[i] = xbar
}

# Set up plotting area for two plots
par(mfrow=c(2,1))

# Plot 1: Population Distribution
hist(population[1:10000], # Using subset for clearer visualization
     main="Population Distribution (Chi-square, df=2)",
     xlab="Value",
     col="lightblue",
     breaks=50)
abline(v=theoretical_mean, col="red", lwd=2)
legend("topright", 
       legend=paste("Population Mean =", round(theoretical_mean,2)),
       col="red", lwd=2)

# Plot 2: Sampling Distribution
hist(xbar_holder,
     main="Sampling Distribution of Sample Means",
     xlab="Sample Means",
     col="lightgreen",
     breaks=50)
abline(v=mean(xbar_holder), col="red", lwd=2)
legend("topright", 
       legend=paste("Sample Mean of Means =", round(mean(xbar_holder),2)),
       col="red", lwd=2)

# Print summary statistics
cat("\nPopulation Statistics:\n")
cat("Theoretical Mean:", theoretical_mean, "\n")
cat("Theoretical SD:", theoretical_sd, "\n")
cat("Actual Population Mean:", mean(population), "\n")
cat("Actual Population SD:", sd(population), "\n")

cat("\nSampling Distribution Statistics:\n")
cat("Theoretical SE:", theoretical_se, "\n")
cat("Mean of Sample Means:", mean(xbar_holder), "\n")
cat("SD of Sample Means:", sd(xbar_holder), "\n")
