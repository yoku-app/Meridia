"use client";

import { FormFieldProps } from "@/lib/interfaces/form/forms.interfaces";
import { ClassNameProps } from "@/lib/interfaces/shared/interface";
import { cn } from "@/lib/utils/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FC } from "react";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

interface FormDatePicker extends ClassNameProps {
    field: FormFieldProps<Date | undefined>;
    minDate?: Date;
    modal?: boolean;
    maxDate?: Date;
}

export const FormDatePicker: FC<FormDatePicker> = ({
    field,
    className,
    minDate,
    maxDate,
    modal = true,
}) => {
    return (
        <Popover modal={modal}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                        format(field.value, "PPP")
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                insideDialog={true}
                align="start"
                className=" w-auto p-0 pointer-events-auto"
            >
                <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={field.value}
                    onSelect={field.onChange}
                    fromYear={minDate?.getFullYear() ?? 1960}
                    toYear={maxDate?.getFullYear() ?? 2030}
                    disabled={{
                        before: minDate || new Date("1900-01-01"),
                        after: maxDate,
                    }}
                />
            </PopoverContent>
        </Popover>
    );
};
