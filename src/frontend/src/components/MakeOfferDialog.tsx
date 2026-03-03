import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSubmitOffer } from "@/hooks/useQueries";
import { CheckCircle2, DollarSign, Loader2, XCircle } from "lucide-react";
import { useState } from "react";

interface MakeOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  domain: { id: bigint; name: string; price: number };
  neonColor: string;
}

export function MakeOfferDialog({
  open,
  onOpenChange,
  domain,
  neonColor,
}: MakeOfferDialogProps) {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const submitOffer = useSubmitOffer();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number.parseFloat(amount.replace(/,/g, ""));
    if (!amountNum || !email) return;

    try {
      const result = await submitOffer.mutateAsync({
        domainId: domain.id,
        amount: amountNum,
        email,
      });
      if (result) {
        setStatus("success");
        setTimeout(() => {
          onOpenChange(false);
          setStatus("idle");
          setAmount("");
          setEmail("");
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
      setAmount("");
      setEmail("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        data-ocid="offer.dialog"
        className="sm:max-w-md border bg-[oklch(0.06_0.008_230)] text-foreground"
        style={{
          borderColor: `var(--neon-${neonColor})`,
          boxShadow: `0 0 30px oklch(var(--neon-${neonColor}) / 0.3), 0 0 60px oklch(var(--neon-${neonColor}) / 0.15)`,
        }}
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <DollarSign
              className="w-5 h-5"
              style={{ color: `var(--neon-${neonColor})` }}
            />
            <span>Make an Offer</span>
          </DialogTitle>
          <p className="text-sm text-muted-foreground font-mono-code mt-1">
            {domain.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Listed at ${domain.price.toLocaleString()}
          </p>
        </DialogHeader>

        {status === "success" && (
          <div
            data-ocid="offer.success_state"
            className="flex flex-col items-center gap-3 py-6"
          >
            <CheckCircle2 className="w-12 h-12 text-green-400" />
            <p className="text-center font-medium text-green-400">
              Offer submitted successfully!
            </p>
            <p className="text-center text-sm text-muted-foreground">
              The seller will contact you at {email}
            </p>
          </div>
        )}

        {status === "error" && (
          <div
            data-ocid="offer.error_state"
            className="flex flex-col items-center gap-3 py-4"
          >
            <XCircle className="w-10 h-10 text-destructive" />
            <p className="text-center text-sm text-destructive">
              Failed to submit offer. Please try again.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStatus("idle")}
            >
              Try Again
            </Button>
          </div>
        )}

        {status === "idle" && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label htmlFor="offer-amount" className="text-sm font-medium">
                Offer Amount (USD)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="offer-amount"
                  data-ocid="offer.input"
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g. 1500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7 bg-[oklch(0.09_0.005_230)] border-border focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="offer-email" className="text-sm font-medium">
                Your Email
              </Label>
              <Input
                id="offer-email"
                data-ocid="offer.email.input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[oklch(0.09_0.005_230)] border-border focus:border-primary"
                required
                autoComplete="email"
              />
            </div>

            <Button
              data-ocid="offer.submit_button"
              type="submit"
              className="w-full font-semibold"
              disabled={submitOffer.isPending}
              style={{
                background: `var(--neon-${neonColor})`,
                color: "#000",
              }}
            >
              {submitOffer.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Offer"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
