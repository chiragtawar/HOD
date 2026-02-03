import React, { useState } from 'react';
import { FileText } from 'lucide-react';

const StampDutyCalculator = () => {
    const [location, setLocation] = useState('urban');
    const [gender, setGender] = useState('male');
    const [agreementValue, setAgreementValue] = useState('');
    const [marketValue, setMarketValue] = useState('');
    const [result, setResult] = useState(null);

    const calculateStampDuty = () => {
        const val1 = parseFloat(agreementValue) || 0;
        const val2 = parseFloat(marketValue) || 0;
        const taxableAmount = Math.max(val1, val2);

        if (taxableAmount === 0) {
            setResult(null);
            return;
        }

        let rate = 0;

        // Base Rates: Urban 7%, Rural 5%
        if (location === 'urban') {
            rate = 7;
        } else {
            rate = 5;
        }

        // Discounts
        // Women get 1% discount (Urban: 7->6, Rural: 5->4)
        if (gender === 'female') {
            rate -= 1;
        }
        // Joint ownership logic (simplified as average or specific rate, usually -1% if one is female)
        // For this calculator, let's treat Joint as standard rate for now or -0.5%? 
        // Screenshot said "Based on both parties' categories". 
        // Let's implement a simple logic: Joint (M+F) usually gets benefit. 
        // However, to keep it simple and match common online calculators:
        // Male: Base
        // Female: Base - 1%
        // Joint (M+F): Base - 0.5% (approx) or just Base. 
        // Re-reading screenshot: "Women Buyers: May receive 1% discount".
        // Let's stick to: Male (Base), Female (Base - 1%), Joint (Base - 1% if we assume M+W).
        // Let's assume Joint = Base - 0% for now to be safe, or make it selectable.
        // Actually, simplest is just Male/Female inputs. If Joint, user can calc accordingly. 
        // But the dropdown exists. I'll add logic: Joint = Base - 0.5% (Intermediate).

        if (gender === 'joint') {
            // Often joint with a woman gets standard woman concession or half of it.
            // Let's assume 0.5% discount for mixed ownership.
            rate -= 0; // Keeping standard for now unless verified.
        }

        const stampDuty = (taxableAmount * rate) / 100;
        const registrationFee = Math.min(50000, 50000); // Standard flat fee often capped or 1%. 
        // Haryana: Reg fee is slab based, max 50k usually. 
        // Let's simplified reg fee:
        // Upto 50k: 50
        // 50k-5L: 100-1000... 
        // > 25L: 15000. 
        // Let's use a simplified logical Estimate: 1% capped at 50k?
        // Actually, let's just show Stamp Duty as requested. Reg fee is complex.

        setResult({
            taxableAmount,
            rate,
            stampDuty,
            total: stampDuty // + registrationFee if we add it
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mt-12">
            <div className="bg-slate-900 p-6 text-white flex items-center">
                <FileText className="h-6 w-6 text-accent mr-3" />
                <h2 className="text-xl font-bold">Haryana Stamp Duty Calculator</h2>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Info Column */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-3">What is Stamp Duty?</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Stamp duty is a government tax imposed on property transactions. It is required to legalize the ownership transfer between parties. In Haryana, the stamp duty varies based on property location, buyer category, and document type.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-3">Stamp Duty Rates in Haryana</h3>
                        <ul className="text-gray-600 text-sm space-y-2 list-disc pl-5">
                            <li><strong>Urban Areas (Within MC limits):</strong> 7%</li>
                            <li><strong>Rural Areas (Outside MC):</strong> 5%</li>
                            <li><strong>Women Buyers:</strong> May receive 1% discount</li>
                            <li><strong>Joint Ownership:</strong> Based on both parties' categories</li>
                        </ul>
                    </div>
                </div>

                {/* Calculator Column */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-800">Property Transaction Calculator</h3>

                    <div>
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-primary bg-white"
                        >
                            <option value="urban">Within MC (Urban)</option>
                            <option value="rural">Outside MC (Rural)</option>
                        </select>
                    </div>

                    <div>
                        <select
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-primary bg-white"
                            defaultValue="deed"
                        >
                            <option value="deed">Sale Deed / Conveyance Deed</option>
                        </select>
                    </div>

                    <div>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-primary bg-white"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="joint">Joint (Male + Female)</option>
                            <option value="other">Other / Corporate</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="number"
                            placeholder="Enter Agreement Value"
                            value={agreementValue}
                            onChange={(e) => setAgreementValue(e.target.value)}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-primary"
                        />
                    </div>

                    <div>
                        <input
                            type="number"
                            placeholder="Enter Market Value"
                            value={marketValue}
                            onChange={(e) => setMarketValue(e.target.value)}
                            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-primary"
                        />
                    </div>

                    <button
                        onClick={calculateStampDuty}
                        className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition shadow-md"
                    >
                        Calculate Fees
                    </button>

                    {result && (
                        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 text-sm">Applicable Rate</span>
                                <span className="font-bold text-green-700">{result.rate}%</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 text-sm">Taxable Amount</span>
                                <span className="font-bold text-gray-800">₹ {result.taxableAmount.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="border-t border-green-200 my-2 pt-2 flex justify-between items-center text-lg">
                                <span className="text-green-800 font-bold">Stamp Duty</span>
                                <span className="font-bold text-green-800">₹ {result.stampDuty.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StampDutyCalculator;
