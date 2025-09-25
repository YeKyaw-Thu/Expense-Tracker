const Expense = require('../models/Expense');

// Add new expense
exports.addExpense = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        const expense = new Expense({ title, amount, category, date: date || new Date(), userId: req.user.id });
        await expense.save();
        res.status(201).json({ message: "Expense added", expense });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// Get all expenses for user
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// Update expense
exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findOneAndUpdate({ _id: id, userId: req.user.id }, req.body, { new: true });
        if (!expense) return res.status(404).json({ message: "Expense not found" });
        res.json(expense);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!expense) return res.status(404).json({ message: "Expense not found" });
        res.json({ message: "Expense deleted" });
    } catch (err) { res.status(500).json({ message: err.message }); }
};
