'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/app/_components/button/button';
import { Input } from '@/app/_components/input/input';

type NumberInputProps = {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    onIncrement?: (value: number) => void;
    onDecrement?: (value: number) => void;
};

export default function NumberInput({ min = 0, max = 100, step = 1, defaultValue = 0, onChange, onIncrement, onDecrement }: NumberInputProps = {}) {
    const [value, setValue] = useState(defaultValue);

    const handleIncrement = () => {
        const newValue = Math.min(value + step, max);
        setValue(newValue);
        onChange?.(newValue);
        onIncrement?.(newValue);
    };

    const handleDecrement = () => {
        const newValue = Math.max(value - step, min);
        setValue(newValue);
        onChange?.(newValue);
        onDecrement?.(newValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue === '') {
            setValue(min);
            onChange?.(min);
        } else {
            const newValue = Math.max(Math.min(Number(inputValue), max), min);
            setValue(newValue);
            onChange?.(newValue);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handleDecrement} disabled={value <= min} aria-label="Decrease value">
                <Minus className="size-4" />
            </Button>
            <Input type="number" value={value} onChange={handleInputChange} className="w-20 text-center" min={min} max={max} step={step} />
            <Button variant="outline" size="icon" onClick={handleIncrement} disabled={value >= max} aria-label="Increase value">
                <Plus className="size-4" />
            </Button>
        </div>
    );
}
