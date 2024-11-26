import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { Icon } from "@iconify/react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        type,
        action,
        ...props
      }) {
        return (
          <Toast className="bg-gray-100" key={id} {...props}>
            <div className="grid gap-1 ">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>
                  <div className="flex items-center">
                    {type === "alert" ? (
                      <Icon
                        className="text-red-600 h-6 w-6 mr-4"
                        icon="lucide:circle-alert"
                      />
                    ) : (
                      <Icon
                        className="text-green-600 h-6 w-6 mr-4"
                        icon="lucide:circle-check-big"
                      />
                    )}
                    {description}
                  </div>
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
