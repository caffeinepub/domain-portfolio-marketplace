import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContactSeller } from "@/hooks/useQueries";
import { CheckCircle2, Loader2, MessageSquare, XCircle } from "lucide-react";
import { useState } from "react";

interface ContactSellerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  domain: { id: bigint; name: string };
  neonColor: string;
}

export function ContactSellerDialog({
  open,
  onOpenChange,
  domain,
  neonColor,
}: ContactSellerDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const contactSeller = useContactSeller();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    try {
      const result = await contactSeller.mutateAsync({
        domainId: domain.id,
        name,
        email,
        message,
      });
      if (result) {
        setStatus("success");
        setTimeout(() => {
          onOpenChange(false);
          setStatus("idle");
          setName("");
          setEmail("");
          setMessage("");
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setStatus("idle");
      setName("");
      setEmail("");
      setMessage("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        data-ocid="contact.dialog"
        className="sm:max-w-md border bg-[oklch(0.06_0.008_230)] text-foreground"
        style={{
          borderColor: `var(--neon-${neonColor})`,
          boxShadow: `0 0 30px oklch(var(--neon-${neonColor}) / 0.3), 0 0 60px oklch(var(--neon-${neonColor}) / 0.15)`,
        }}
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <MessageSquare
              className="w-5 h-5"
              style={{ color: `var(--neon-${neonColor})` }}
            />
            <span>Hubungi Seller</span>
          </DialogTitle>
          <p className="text-sm text-muted-foreground font-mono-code mt-1">
            {domain.name}
          </p>
        </DialogHeader>

        {status === "success" && (
          <div
            data-ocid="contact.success_state"
            className="flex flex-col items-center gap-3 py-6"
          >
            <CheckCircle2 className="w-12 h-12 text-green-400" />
            <p className="text-center font-medium text-green-400">
              Pesan terkirim!
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Seller akan menghubungi Anda di {email}
            </p>
          </div>
        )}

        {status === "error" && (
          <div
            data-ocid="contact.error_state"
            className="flex flex-col items-center gap-3 py-4"
          >
            <XCircle className="w-10 h-10 text-destructive" />
            <p className="text-center text-sm text-destructive">
              Gagal mengirim pesan. Silakan coba lagi.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStatus("idle")}
            >
              Coba Lagi
            </Button>
          </div>
        )}

        {status === "idle" && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="contact-name" className="text-sm font-medium">
                Nama
              </Label>
              <Input
                id="contact-name"
                data-ocid="contact.name.input"
                type="text"
                placeholder="Nama lengkap Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[oklch(0.09_0.005_230)] border-border focus:border-primary"
                required
                autoComplete="name"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="contact-email"
                data-ocid="contact.email.input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[oklch(0.09_0.005_230)] border-border focus:border-primary"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-message" className="text-sm font-medium">
                Pesan
              </Label>
              <Textarea
                id="contact-message"
                data-ocid="contact.textarea"
                placeholder="Tulis pesan Anda di sini..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-[oklch(0.09_0.005_230)] border-border focus:border-primary resize-none min-h-[100px]"
                required
              />
            </div>

            <Button
              data-ocid="contact.submit_button"
              type="submit"
              className="w-full font-semibold"
              disabled={contactSeller.isPending}
              style={{
                background: `var(--neon-${neonColor})`,
                color: "#000",
              }}
            >
              {contactSeller.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : (
                "Kirim Pesan"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
