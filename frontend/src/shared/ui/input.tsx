import * as React from "react";

import { cn } from "@/shared/lib";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";
import clsx from "clsx";
import InputModule from "../styles/input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorText?: string;
  needCounter?: boolean;
  divClassName?: string;
  necessarily?: boolean;
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
      onChange,
      minLength = 3,
      maxLength = 150,
      necessarily = true,
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
          "flex flex-col w-full  relative remove-number",
          divClassName,
        )}
      >
        <input
          onChange={onChangeHandler}
          type={type}
          className={cn(
            "select-text flex min-h-[48px] w-full rounded-[12px] border-2 border-stroke bg-background px-3 py-2 text-[16px]" +
              " placeholder:text-inactive focus-visible:border-stroke-active focus-visible:outline-0  transition-colors hover:border-stroke-hover" +
              " duration-150 disabled:cursor-not-allowed disabled:opacity-50 outline-none",
            className,
            error
              ? "border-error hover:border-error focus-visible:border-error"
              : null,
          )}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
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
