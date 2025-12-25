import { useState, useMemo } from "react";
import { Calculator, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Finance = () => {
  const [vehiclePrice, setVehiclePrice] = useState(300000);
  const [deposit, setDeposit] = useState(30000);
  const [term, setTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(11.5);

  const calculation = useMemo(() => {
    const principal = vehiclePrice - deposit;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
      principal,
    };
  }, [vehiclePrice, deposit, term, interestRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-secondary/30">
        <div className="container max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
              Finance Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate your monthly repayments. We offer finance with all major banks.
              No driver's license needed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-card p-8 rounded-xl border border-border shadow-sm space-y-8">
              {/* Vehicle Price */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-medium">Vehicle Price</label>
                  <span className="font-bold text-primary">{formatCurrency(vehiclePrice)}</span>
                </div>
                <Slider
                  value={[vehiclePrice]}
                  onValueChange={([value]) => setVehiclePrice(value)}
                  min={50000}
                  max={2000000}
                  step={10000}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>R50,000</span>
                  <span>R2,000,000</span>
                </div>
              </div>

              {/* Deposit */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-medium">Deposit</label>
                  <span className="font-bold text-primary">{formatCurrency(deposit)}</span>
                </div>
                <Slider
                  value={[deposit]}
                  onValueChange={([value]) => setDeposit(value)}
                  min={0}
                  max={vehiclePrice * 0.5}
                  step={5000}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>R0</span>
                  <span>{formatCurrency(vehiclePrice * 0.5)}</span>
                </div>
              </div>

              {/* Term */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-medium">Loan Term</label>
                  <span className="font-bold text-primary">{term} months</span>
                </div>
                <Slider
                  value={[term]}
                  onValueChange={([value]) => setTerm(value)}
                  min={12}
                  max={84}
                  step={12}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>12 months</span>
                  <span>84 months</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="font-medium">Interest Rate</label>
                  <span className="font-bold text-primary">{interestRate.toFixed(1)}%</span>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={([value]) => setInterestRate(value)}
                  min={8}
                  max={20}
                  step={0.5}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>8%</span>
                  <span>20%</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Monthly Payment */}
              <div className="bg-primary text-primary-foreground p-8 rounded-xl text-center">
                <p className="text-sm opacity-80 mb-2">Estimated Monthly Payment</p>
                <p className="font-display text-4xl md:text-5xl font-bold">
                  {formatCurrency(calculation.monthlyPayment)}
                </p>
                <p className="text-sm opacity-80 mt-2">per month for {term} months</p>
              </div>

              {/* Summary */}
              <div className="bg-card p-6 rounded-xl border border-border space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Vehicle Price</span>
                  <span className="font-semibold">{formatCurrency(vehiclePrice)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Deposit</span>
                  <span className="font-semibold">- {formatCurrency(deposit)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Amount Financed</span>
                  <span className="font-semibold">{formatCurrency(calculation.principal)}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Total Interest</span>
                  <span className="font-semibold">{formatCurrency(calculation.totalInterest)}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-medium">Total Payable</span>
                  <span className="font-bold text-lg">{formatCurrency(calculation.totalPayment)}</span>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex gap-3 p-4 bg-muted rounded-lg">
                <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  This calculator provides estimates only. Actual rates and terms depend 
                  on your credit profile. Contact us for a personalized quote.
                </p>
              </div>

              <a href="tel:0216971063">
                <Button size="lg" className="w-full">
                  Apply for Finance
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Finance;
