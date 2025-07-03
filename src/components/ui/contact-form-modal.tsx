"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import { Label } from "./label";
import { FormControl, FormField, FormItem, FormMessage, Form } from "./form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    grecaptcha: any;
  }
}

const contactSchema = z.object({
  name: z.string().min(1, "Поле обов’язкове"),
  phone: z
    .string()
    .min(1, "Поле обов’язкове")
    .regex(/^\+38\d+$/, "Номер телефону повинен починатися з +38"),
  message: z.string().optional(),
  agree: z.boolean().refine((val) => val === true, {
    message: "Потрібно погодитися з умовами",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const grecaptcha: any;

export function ContactFormModal({
  isOpen,
  onClose,
  isItPurchase,
}: {
  isOpen: boolean;
  onClose: () => void;
  isItPurchase?: boolean;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
      agree: false,
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!window.grecaptcha) {
        throw new Error("reCAPTCHA не завантажена");
      }
      const token = await grecaptcha.enterprise.execute(
        // TODO:
        "6LdtgmkrAAAAAF90jlSOUcng0eJMtTMcfTjE257B",
        { action: "LOGIN" }
      );

      if (!token) {
        setSubmitError("Підтвердіть, що ви не робот");
        setIsSubmitting(false);
        return;
      }
      const dataWithToken = { ...data, recaptchaToken: token };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithToken),
      });

      if (!response.ok) {
        throw new Error("Помилка при відправці форми");
      }

      reset();
      setIsSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Помилка при відправці форми"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[315px] md:max-w-[425px]">
        <DialogHeader>
          {isItPurchase ? (
            <DialogTitle>{isSuccess ? "Надіслано" : "Замовлення"}</DialogTitle>
          ) : (
            <DialogTitle>{isSuccess ? "Успішно" : "Запит"}</DialogTitle>
          )}
        </DialogHeader>
        {isSuccess ? (
          <div className="text-center py-8">
            {isItPurchase ? (
              <p className="text-green-600 text-lg font-semibold mb-4">
                Запит надіслано. Чекайте, з вами зв&rsquo;яжуться
              </p>
            ) : (
              <p className="text-green-600 text-lg font-semibold mb-4">
                Звернення надіслано
              </p>
            )}
            <Button onClick={onClose}>Закрити</Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Ім&apos;я*</Label>
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Ваше ім'я"
                          {...field}
                          className="border border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs md:text-sm mt-1">
                        {errors.name?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="phone">Телефон*</Label>
                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="phone"
                          placeholder="Номер телефону"
                          {...field}
                          className="border border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs md:text-sm mt-1">
                        {errors.phone?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="message">Коментар</Label>
                <FormField
                  control={control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          id="message"
                          placeholder={
                            isItPurchase
                              ? "Деталі до замовлення"
                              : "Що саме вас цікавить"
                          }
                          {...field}
                          className="border border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-700"
                        />
                      </FormControl>
                      <FormMessage>{errors.message?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              {submitError && (
                <p className="text-red-500 text-sm">{submitError}</p>
              )}

              <FormField
                control={control}
                name="agree"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <div className="flex items-start space-x-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => onChange(e.target.checked)}
                          {...field}
                        />
                      </FormControl>
                      <Label>
                        Я погоджуюсь з{" "}
                        <a
                          href="/privacy-policy"
                          className="underline text-violet-700"
                          target="_blank"
                        >
                          політикою конфіденційності
                        </a>
                      </Label>
                    </div>
                    <FormMessage className="text-red-500 text-xs md:text-sm mt-1">
                      {errors.agree?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button
                  data-gtm="button-submit-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="h-[35px] lg:h-[40px] w-[100px] lg:w-[150px] cursor-pointer border-0 bg-amber-400 text-white"
                >
                  {isSubmitting ? "Відправляю..." : "Надіслати"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
