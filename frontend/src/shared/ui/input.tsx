import * as React from "react";

import { cn } from "@/shared/lib";
import { CircleX, Eye, EyeOff, Search } from "lucide-react";
import { Button } from "./button";
import clsx from "clsx";
import InputModule from "../styles/input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorText?: string;
  needCounter?: boolean;
  needSearch?: boolean;
  divClassName?: string;
  necessarily?: boolean;
  onSearch?: () => void;
  needDelete?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      errorText,
      placeholder,
      needCounter,
      needSearch,
      needDelete,
      onChange,
      minLength = 3,
      maxLength = 150,
      necessarily = true,
      onSearch,
      divClassName,
      ...props
    },
    ref,
  ) => {
    if (needCounter && props.value) {
      length = props.value?.toString().length;
    }
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      if (props.value) setCount(props.value?.toString().length);
    }, [props.value]);

    const onChangeHandler = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setCount(event.target.value.length);
        onChange?.(event);
      },
      [setCount, onChange],
    );

    return (
      <div
        className={clsx(
          "flex flex-col w-full justify-center relative remove-number",
          divClassName,
        )}
      >
        <input
          onChange={onChangeHandler}
          type={type}
          className={cn(
            "input-autofill-reset relative select-text flex min-h-[48px] w-full rounded-[8px] bg-background px-3 py-2 text-[14px] border border-gray2 " +
              "text-black placeholder:text-gray-text focus-visible:border-blue-input focus-visible:ring-2 focus-visible:ring-[#1890FF33] transition-colors " +
              "duration-150 disabled:cursor-not-allowed disabled:opacity-50 outline-none",
            className,
            error
              ? "border-error hover:border-error focus-visible:border-error"
              : null,
          )}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        {needDelete && count > 0 && (
          <CircleX
            className="w-[14px] h-[14px] absolute right-3 cursor-pointer text-gray-text"
            onClick={() => {
              onChange?.({ target: { value: "" } } as any);
              setCount(0);
            }}
          />
        )}
        {needSearch && (
          <Search
            className="w-[14px] h-[14px] absolute right-3 cursor-pointer text-gray-text"
            onClick={() => onSearch?.()}
          />
        )}

        {needCounter ? (
          <div className="flex justify-between">
            <span
              className={clsx(
                " ml-auto text-secondary  text-[14px] text bottom-[-20px]",
                error ? "!text-alert !text-[#FF4040]" : null,
              )}
            >
              {`${count} из ${maxLength} символов (минимум ${minLength})`}
            </span>
          </div>
        ) : (
          error && (
            <span
              className={clsx(
                " ml-auto text-secondary  text-[14px] text bottom-[-20px]",
                { "text-alert text-[#FF4040] ": error },
              )}
            >
              {errorText}
            </span>
          )
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, errorText, placeholder, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    return (
      <div className={InputModule.root}>
        <label
          className={cn(
            InputModule.input_conteiner,
            error && InputModule.error,
          )}
        >
          <input
            type={show ? "text" : "password"}
            placeholder={placeholder}
            ref={ref}
            {...props}
            className={InputModule.input}
          />
          <Button
            type="button"
            onClick={() => setShow(!show)}
            variant={"link"}
            className={InputModule.btn}
          >
            {show ? <EyeOff /> : <Eye />}
          </Button>
        </label>
        {error ? (
          <span className="text-error ml-3 text-[14px] font-manrope">
            {errorText}
          </span>
        ) : null}
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword";

export { Input, InputPassword };
