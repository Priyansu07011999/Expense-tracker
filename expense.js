function submit_form() {
      const name = document.getElementById('expenseName').value;
      const amount = document.getElementById('expenseAmount').value;
      const index = document.getElementById('expenseIndex').value;
    
      if (name && amount) {
        const expense = { name, amount };
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
        if (index !== "") {
          // Update existing expense
          expenses[index] = expense;
        } else {
          // Add new expense
          expenses.push(expense);
        }
    
        localStorage.setItem('expenses', JSON.stringify(expenses));
    
        // Clear form fields and index
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseIndex').value = '';

      updateList();
    }
  }

  function updateList() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    const expenses = JSON.parse(localStorage.getItem('expenses')) ;
    expenses.forEach(function(expense, index){
      const listItem = document.createElement('li');
      listItem.className = 'list';
      listItem.innerHTML = `${expense.name} -> ${expense.amount}
                           <button type="button" class="btn btn-secondary mr-2" onclick="editExpense(${index})">Edit-Expenses</button>
                           <button type="button" class="btn btn-danger" onclick="removeExpense(${index})">Delete-Expenses</button>`;
      expenseList.appendChild(listItem);
    });
  }

  // Function to remove an expense
  function removeExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) ;
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateList();
  }

  // Function to edit an expense
  function editExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) ;
    const editedExpense = expenses[index];

    document.getElementById('expenseName').value = editedExpense.name;
    document.getElementById('expenseAmount').value = editedExpense.amount;
    document.getElementById('expenseIndex').value = index;

    // Update the expense list
    updateList();
  }

  // Initial update
  updateList();
