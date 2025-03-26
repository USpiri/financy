import { CATEGORIES } from "@/config/category";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TransactionCategory, TransactionType } from "@/models";
import { Controller, useForm } from "react-hook-form";
import { useTransactions } from "@/hooks/useTransactions";
import { useUIStore } from "@/store/ui.store";

type FormValues = {
  note: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  description?: string;
  transactionDate: Date;
};

const defaultValues = { transactionDate: new Date() };

export const TransactionForm = () => {
  const { createTransaction, updateTransaction, loadingAction, active } =
    useTransactions();
  const toggleDialog = useUIStore((store) => store.toggleTransactionsModal);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { ...defaultValues, ...active } });

  const onSubmit = async (data: FormValues) => {
    if (active && active.id) {
      await updateTransaction(data);
    } else {
      await createTransaction(data);
    }
    toggleDialog(false);
  };

  return (
    <form
      className="flex flex-col gap-4 *:space-y-2"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <div>
        <Label htmlFor="note">Title</Label>
        <Input
          id="note"
          placeholder="Flight Ticket"
          disabled={loadingAction}
          {...register("note", { required: true })}
          aria-invalid={errors.note ? "true" : "false"}
        />
      </div>
      <Controller
        control={control}
        name="type"
        defaultValue="expense"
        render={({ field }) => (
          <Tabs
            defaultValue={field.value}
            onValueChange={field.onChange}
            {...field}
          >
            <TabsList className="grid w-full grid-cols-2 border p-0 dark:bg-transparent">
              <TabsTrigger value="expense" disabled={loadingAction}>
                Expense
              </TabsTrigger>
              <TabsTrigger value="income" disabled={loadingAction}>
                Income
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      />
      <div>
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <span className="absolute top-1/2 left-3 -translate-y-1/2">$</span>
          <Input
            id="amount"
            placeholder="0.00"
            step={0.01}
            type="number"
            className="pl-7"
            {...register("amount", { required: true, min: 0 })}
            aria-invalid={errors.amount ? "true" : "false"}
            disabled={loadingAction}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Controller
          name="category"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              {...field}
              disabled={loadingAction}
            >
              <SelectTrigger
                id="category"
                className="w-full capitalize"
                aria-invalid={errors.category ? "true" : "false"}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Controller
          control={control}
          name="transactionDate"
          rules={{ required: true }}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild id="transactionDate">
                <Button
                  variant="outline"
                  className="text-muted-foreground w-full justify-start rounded-sm"
                  disabled={loadingAction}
                >
                  <CalendarIcon />{" "}
                  {field.value ? (
                    field.value.toDateString()
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </div>
      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          disabled={loadingAction}
          id="description"
          placeholder="Add a description about this transaction"
          rows={3}
        />
      </div>
      <div>
        <Button
          type="submit"
          className="w-full flex-1 transition-all"
          disabled={loadingAction}
        >
          {loadingAction && (
            <LoaderCircle className="animate-spin opacity-80" />
          )}
          Submit
        </Button>
      </div>
    </form>
  );
};
