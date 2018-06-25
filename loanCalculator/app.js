// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Show Loader
    document.getElementById('loading').style.display = 'block';

    console.log('Show this message before calculateResults..');

    setTimeout(calculateResults, 2000);

    e.preventDefault();
    
});

// Calculate Results function
function calculateResults() {
    console.log('Calculating ...');

    // UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Show Results
        document.getElementById('results').style.display = 'block';

        // Hide the loader img
        document.getElementById('loading').style.display = 'none';

    } else {
        console.log('Please check your numbers');
        showError('Please check your numbers.');
    }
    
}

// Show Error function
function showError(error) {
    // Hide Results
    document.getElementById('results').style.display = 'none';

    // Hide the loader img
    document.getElementById('loading').style.display = 'none';

    // Create a Div
    const errorDiv = document.createElement("div");

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add Class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error)); 

    // Insert error above heading
    // 1st parameter is what you're inserting
    // 2nd parament  is what you want to insert before
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    // Takes 2 parameters
    // 1 parameter is a function, 2nd parameter is how many miliseconds long
    setTimeout(clearError, 3000);
}

// Clear Error function
function clearError() {
    document.querySelector('.alert').remove();
}