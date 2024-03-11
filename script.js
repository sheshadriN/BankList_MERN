'use strict';


const account1 = {
    owner: 'sheshadri',
    movements: [],
    interest: 0, // %
    pin: 1111,
};

const account2 = {
    owner: 'harrish',
    movements: [],
    interest: 0,
    pin: 2222,
};

const account3 = {
    owner: 'naveen',
    movements: [],
    interest: 0,
    pin: 3333,
};

const account4 = {
    owner: 'thoufiq',
    movements: [],
    interest: 0,
    pin: 4444,
};
const account5 = {
    owner: 'austin ',
    movements: [0, 0],
    interest: 0,
    pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome'); ////////////////////////////////////////////////////done
const labelDate = document.querySelector('.date'); //////////////////////////////////////////////done
const labelBalance = document.querySelector('.balance__value'); ////////////////////////////////////////////////////done
const labelSumIn = document.querySelector('.summaryvalue--in'); ////////////////////////////////////////////////////done
const labelSumOut = document.querySelector('.summaryvalue--out'); ////////////////////////////////////////////////////done
const labelSumInterest = document.querySelector('.summaryvalue--interest'); ////////////////////////////////////////////////////done
const labelTimer = document.querySelector('.timer'); /////////////////////////////////////////////////////////////done
const movementDate = document.querySelector('.movements__date'); //////////////////////////////////done

const containerApp = document.querySelector('.app'); ////////////////////////////////////////////////////done
const containerMovements = document.querySelector('.movcol'); ////////////////////////////////////////////////////done

const btnLogin = document.querySelector('.login__btn'); ////////////////////////////////////////////////////done
const btnTransfer = document.querySelector('.formbtn--transfer'); ////////////////////////////////////////////////////done
const btnLoan = document.querySelector('.formbtn--loan'); ////////////////////////////////////////////////////done
const btnClose = document.querySelector('.formbtn--close'); //////////////////////////////////////////////////////////done
const btnSort = document.querySelector('.btn--sort'); //////////////////////////////////////////////////////////////////done

const inputLoginUsername = document.querySelector('.logininput--user'); ////////////////////////////////////////////////////done
const inputLoginPin = document.querySelector('.logininput--pin') ////////////////////////////////////////////////////done
const inputTransferTo = document.querySelector('.forminput--to'); ////////////////////////////////////////////////////done
const inputTransferAmount = document.querySelector('.forminput--amount'); ////////////////////////////////////////////////////done
const inputLoanAmount = document.querySelector('.forminput--loan-amount'); ////////////////////////////////////////////////////done
const inputCloseUsername = document.querySelector('.forminput--user'); ////////////////////////////////////////////done
const inputClosePin = document.querySelector('.forminput--pin'); ////////////////////////////////////////////done

/////////////////////////////////////////////////
// Functions

let year = 2003;
let month = 10;
let date = 11;




const displayMovements = function(movs, sort = false) {
    containerMovements.innerHTML = '';


    movs.forEach(function(mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        Date1("movements")

        const html = `
      <div class="movements__row">
        <div class="movementstype movementstype--${type}">${
      i + 1

    }. ${type}</div>
    <div class="movements__date">${date}/${month}/${year}</div>
        <div class="movements__value">${mov}\u20B9</div>
      </div>
    `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance}\u20B9`;
    Date1();
    labelDate.textContent = date + "/" + month + "/" + year;
};

const calcDisplaySummary = function(acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}\u20B9`;

    const out = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}\u20B9`;

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate) / 100)
        .filter((int, i, arr) => {
            // console.log(arr);
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}\u20B9`;
};




const updateUI = function(acc) {

    displayMovements(acc.movements);


    calcDisplayBalance(acc);

    calcDisplaySummary(acc);


    ///interest
    labelSumInterest.textContent = acc.interest;
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function(e) {
    e.preventDefault();
    currentAccount = accounts.find(
        acc => acc.owner === inputLoginUsername.value
    );
    if (currentAccount === undefined) {
        alert('Incorrect username  ' + inputLoginUsername.value + '!!')
    }
    if (currentAccount.pin === Number(inputLoginPin.value)) {

        alert('verified  ' + currentAccount.owner + '!!');
        timer(5)
        labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner
    }`;
        containerApp.style.opacity = 100;
        inputLoginUsername.value = inputLoginPin.value = '';
        updateUI(currentAccount);


        ////timerClose


    } else {
        alert('Incorrect Password  ' + currentAccount.owner + '!!')
    }
});


btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.owner === inputTransferTo.value);
    inputTransferAmount.value = inputTransferTo.value = '';

    if (
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc.owner !== currentAccount.owner
    ) {
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // Update UI
        updateUI(currentAccount);
    }

});




///loan

btnLoan.addEventListener('click', function(e) {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (amount > 0) {
        currentAccount.movements.push(amount);
        currentAccount.interest += Number((amount / 100) * 2.7.toFixed(2));
        updateUI(currentAccount);
    }
    inputLoanAmount.value = '';
});





///sort
var sort = false;
btnSort.addEventListener('click', function() {
    const Sorting = currentAccount.movements.slice();
    Sorting.sort();
    sort = sort === false ? true : false;
    sort === true ? displayMovements(Sorting) : displayMovements(currentAccount.movements)
});



///account close
btnClose.addEventListener('click', function(e) {
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.owner === inputCloseUsername.value
    );
    if (currentAccount === undefined) {
        alert('Incorrect username  ' + inputCloseUsername.value + '!!')
    }

    if (currentAccount.pin === Number(inputClosePin.value)) {
        alert('Closed  ' + currentAccount.owner + '!!')
        labelWelcome.textContent = 'Log in to get started';
        currentAccount.movements = [];
        currentAccount.interest = 0;
        containerApp.style.opacity = 0;
    } else {
        alert('Incorrect username  ' + inputCloseUsername.value + '!!')
    }
})









///date
function Date1() {
    let currentdate = new Date();
    year = currentdate.getFullYear();
    month = currentdate.getMonth() + 1;
    date = currentdate.getDate();
}



//////timer
function timer(duration) {

    var targetTime = new Date().getTime() + (duration * 60 * 1000);
    var countdownInterval = setInterval(function() {
        var currentTime = new Date().getTime();
        var timeRemaining = targetTime - currentTime;
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            labelWelcome.textContent = 'Log in to get started';
            alert("logged out");
            containerApp.style.opacity = 0;
            console.log("Countdown has ended!");
        } else {
            var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            labelTimer.textContent = minutes + " : " + seconds;
            console.log("Countdown: " + minutes + "m " + seconds + "s");
        }
    }, 1000);

}