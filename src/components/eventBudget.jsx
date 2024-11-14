import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function EventBudget() {
  const [incomeData, setIncomeData] = useState([
  ]);
  const [expenseData, setExpenseData] = useState([
  ]);
  const [newDescription, setNewDescription] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const handleAddIncome = () => {
    if(newDescription!=="" && (newAmount!==0 || !isNaN(newAmount))){
    setIncomeData([
      ...incomeData,
      { id: incomeData.length + 1, description: newDescription, amount: newAmount },
    ]);
    setNewDescription("");
    setNewAmount("");
  }
  };

  const handleAddExpense = () => {
    if(newDescription!=="" && (newAmount!==0 || !isNaN(newAmount))){
    setExpenseData([
      ...expenseData,
      { id: expenseData.length + 1, description: newDescription, amount: newAmount },
    ]);
    setNewDescription("");
    setNewAmount("");
  }
  };

  const deleteIncome = (id) => {
    setIncomeData(incomeData.filter(item => item.id !== id));
  };

  const deleteExpense = (id) => {
    setExpenseData(expenseData.filter(item => item.id !== id));
  };


  const calculateProfit = () => {
    const totalIncome = incomeData.reduce((sum, item) => sum + parseInt(item.amount), 0);
    const totalExpense = expenseData.reduce((sum, item) => sum + parseInt(item.amount), 0);
    return totalIncome - totalExpense;
  };
  const profit=calculateProfit()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Budget</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tech conference-2024 Budget</DialogTitle>
        </DialogHeader>

        <Table>
          <TableHeader>
            <h1 className="w-[100px] font-bold">Income</h1>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incomeData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.amount}</TableCell>
                <TableCell>
                  <Button variant='destructive' onClick={() => deleteIncome(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <h1 className="w-[100px] font-bold">Expense</h1>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenseData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.amount}</TableCell>
                <TableCell>
                  <Button variant='destructive' onClick={() => deleteExpense(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div>
        <h1 className="font-bold">Profit</h1>
        {(() => {
          if(profit>=0)
            return( <p className="bg-lime-200 p-3">${profit}</p>)
          else
          return (<p className="bg-red-200 p-3">${profit}</p>)
        })()}

          
        </div>
        <h1 className="font-bold">Add New Item</h1>
        <div className="flex gap-3">
          <Input
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />

          <Input
            type='number'
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
          
        </div>

        <div className="flex gap-3">
          <Button className="w-full" onClick={handleAddIncome}>Add Income</Button>
          <Button className="w-full" onClick={handleAddExpense}>Add Expense</Button>
        </div>

        <DialogClose className="flex gap-3">
          <Button className="w-full">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
