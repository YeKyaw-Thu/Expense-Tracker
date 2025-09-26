'use client';
import { useState } from 'react';
import { addExpense } from '../../services/expenses';

export default function ExpenseForm({ onAdded }: { onAdded: () => void }) {
  const [title, setTitle]
