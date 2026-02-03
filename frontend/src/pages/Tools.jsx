import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import StampDutyCalculator from '../components/calculators/StampDutyCalculator';

const Tools = () => {
    const [propertyValue, setPropertyValue] = useState(5000000);
    const [downPayment, setDownPayment] = useState(1000000);
    const [loanTerm, setLoanTerm] = useState(20);
    const [interestRate, setInterestRate] = useState(8.5);

    const calculateLoanDetails = () => {
        const principal = propertyValue - downPayment;
        const monthlyRate = interestRate / 12 / 100;
        const months = loanTerm * 12;

        if (principal <= 0) return { emi: 0, totalInterest: 0, totalPayment: 0, principal: 0 };

        const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
        const totalPayment = emi * months;
        const totalInterest = totalPayment - principal;

        return {
            emi: Math.round(emi),
            totalInterest: Math.round(totalInterest),
            totalPayment: Math.round(totalPayment),
            principal
        };
    };

    const { emi, totalInterest, totalPayment, principal } = calculateLoanDetails();

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-serif font-bold text-primary mb-4">Investment Tools</h1>
                    <p className="text-gray-600">Plan your property investment with our smart calculators.</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="bg-slate-900 p-6 text-white flex items-center">
                        <Calculator className="h-6 w-6 text-accent mr-3" />
                        <h2 className="text-xl font-bold">EMI Calculator</h2>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Value (₹)</label>
                                <input
                                    type="range" min="1000000" max="50000000" step="500000"
                                    value={propertyValue} onChange={(e) => setPropertyValue(parseInt(e.target.value))}
                                    className="w-full accent-primary"
                                />
                                <div className="mt-2 p-2 bg-gray-50 rounded border text-right font-mono">
                                    ₹ {propertyValue.toLocaleString('en-IN')}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Down Payment (₹)</label>
                                <input
                                    type="range" min="0" max={propertyValue} step="100000"
                                    value={downPayment} onChange={(e) => setDownPayment(parseInt(e.target.value))}
                                    className="w-full accent-primary"
                                />
                                <div className="mt-2 p-2 bg-gray-50 rounded border text-right font-mono">
                                    ₹ {downPayment.toLocaleString('en-IN')}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Term (Years)</label>
                                    <input
                                        type="number"
                                        value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
                                        className="w-full rounded border-gray-300 border p-2 text-center"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Interest Rate (%)</label>
                                    <input
                                        type="number" step="0.1"
                                        value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
                                        className="w-full rounded border-gray-300 border p-2 text-center"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between">
                            <div className="bg-primary/5 rounded-xl p-6 text-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-600 mb-2">Estimated Monthly EMI</h3>
                                <div className="text-4xl font-bold text-primary">
                                    ₹ {emi.toLocaleString('en-IN')}
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Principal Amount</span>
                                    <span className="font-bold">₹ {principal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Total Interest</span>
                                    <span className="font-bold text-orange-600">₹ {totalInterest.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="pt-3 border-t border-gray-200 flex justify-between font-bold">
                                    <span>Total Payable</span>
                                    <span>₹ {totalPayment.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            {/* Visual Breakdown */}
                            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex mb-6">
                                <div
                                    className="bg-primary h-full"
                                    style={{ width: `${(principal / totalPayment) * 100}%` }}
                                    title={`Principal: ${((principal / totalPayment) * 100).toFixed(1)}%`}
                                ></div>
                                <div
                                    className="bg-orange-500 h-full"
                                    style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                                    title={`Interest: ${((totalInterest / totalPayment) * 100).toFixed(1)}%`}
                                ></div>
                            </div>
                            <div className="flex justify-center space-x-6 text-xs text-gray-500 mb-6">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-primary rounded-full mr-1"></div> Principal
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div> Interest
                                </div>
                            </div>

                            <button className="bg-accent text-slate-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-500 transition shadow-md w-full">
                                Apply for Loan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Tools Placeholders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 opacity-75">
                        <h3 className="font-bold text-lg mb-2">Rental Yield Estimator</h3>
                        <p className="text-sm text-gray-500">Calculate potential rental returns on your investment. (Coming Soon)</p>
                    </div>
                </div>

                <StampDutyCalculator />

            </div>
        </div>
    );
};

export default Tools;
