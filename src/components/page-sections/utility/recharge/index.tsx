import RechargeBg from "@/assets/images/recharge.jpg";
import Button from "@/components/custom-ui/button";
import { FormField } from "@/components/custom-ui/form-field";
import { Text } from "@/components/custom-ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react";
import { FaBolt, FaPhone, FaTv, FaWifi } from "react-icons/fa";

const RechargeSection = () => {
  const [airtimeForm, setAirtimeForm] = useState({
    phoneNumber: "",
    network: "",
    amount: "",
    referralCode: "",
  });

  const [dataForm, setDataForm] = useState({
    phoneNumber: "",
    network: "",
    dataPlan: "",
    referralCode: "",
  });

  const [cableForm, setCableForm] = useState({
    operator: "",
    smartcardNumber: "",
    amount: "",
    referralCode: "",
  });

  const [electricityForm, setElectricityForm] = useState({
    provider: "",
    packageType: "",
    meterNumber: "",
    amount: "",
    referralCode: "",
  });

  return (
    <section className="border border-red-200">
      <Text
        variant="h1"
        className="font-medium text-2xl md:text-3xl lg:text-4xl text-center mt-10 mb-4"
      >
        Instant <span className="text-brand-primary">Recharge,</span> Anytime.
      </Text>
      <div className="flex gap-6 w-11/12 max-w-7xl mx-auto py-10">
        <div className="w-full lg:w-[80%] lg:pl-8">
          <Tabs defaultValue="airtime" className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-2 h-auto md:h-16">
              <TabsTrigger
                className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 p-2 md:p-3 h-auto min-h-[3rem] md:h-12 text-[13px] md:text-base"
                value="airtime"
              >
                <FaPhone className="w-4 h-4" />
                <span className="whitespace-nowrap">Airtime</span>
              </TabsTrigger>

              <TabsTrigger
                className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 p-2 md:p-3 h-auto min-h-[3rem] md:h-12 text-[13px] md:text-base"
                value="data"
              >
                <FaWifi className="w-4 h-4" />
                <span className="whitespace-nowrap">Mobile Data</span>
              </TabsTrigger>

              <TabsTrigger
                className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 p-2 md:p-3 h-auto min-h-[3rem] md:h-12 text-[13px] md:text-base"
                value="cable"
              >
                <FaTv className="w-4 h-4" />
                <span className="whitespace-nowrap">Cable TV</span>
              </TabsTrigger>

              <TabsTrigger
                className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 p-2 md:p-3 h-auto min-h-[3rem] md:h-12 text-[13px] md:text-base"
                value="electricity"
              >
                <FaBolt className="w-4 h-4" />
                <span className="whitespace-nowrap">Electricity</span>
              </TabsTrigger>
            </TabsList>

            <div className="min-h-[400px] relative shadow-md rounded-md bg-white p-6 mt-6">
              <TabsContent value="airtime" className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter phone number"
                    required
                    value={airtimeForm.phoneNumber}
                    onChange={(e) =>
                      setAirtimeForm((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                  />
                  <FormField
                    label="Network Provider"
                    type="select"
                    placeholder="Select network"
                    required
                    options={[
                      { value: "mtn", label: "MTN" },
                      { value: "airtel", label: "Airtel" },
                      { value: "glo", label: "Glo" },
                      { value: "9mobile", label: "9Mobile" },
                    ]}
                    value={airtimeForm.network}
                    onValueChange={(value) =>
                      setAirtimeForm((prev) => ({ ...prev, network: value }))
                    }
                  />
                  <FormField
                    label="Amount"
                    type="number"
                    placeholder="Enter amount"
                    min="100"
                    required
                    value={airtimeForm.amount}
                    onChange={(e) =>
                      setAirtimeForm((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                  />
                  <FormField
                    label="Referral Code (Optional)"
                    type="text"
                    placeholder="Enter referral code"
                    value={airtimeForm.referralCode}
                    onChange={(e) =>
                      setAirtimeForm((prev) => ({
                        ...prev,
                        referralCode: e.target.value,
                      }))
                    }
                  />
                </div>
                <Button className="mt-8 mx-auto block">Purchase Airtime</Button>
              </TabsContent>

              <TabsContent value="data" className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter phone number"
                    value={dataForm.phoneNumber}
                    onChange={(e) =>
                      setDataForm((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                  />
                  <FormField
                    label="Network Provider"
                    type="select"
                    placeholder="Select network"
                    required
                    options={[
                      { value: "mtn", label: "MTN" },
                      { value: "airtel", label: "Airtel" },
                      { value: "glo", label: "Glo" },
                      { value: "9mobile", label: "9Mobile" },
                    ]}
                    value={dataForm.network}
                    onValueChange={(value) =>
                      setDataForm((prev) => ({ ...prev, network: value }))
                    }
                  />
                  <FormField
                    label="Data Plan"
                    type="select"
                    placeholder="Select data plan"
                    required
                    options={[
                      { value: "daily", label: "Daily" },
                      { value: "weekly", label: "Weekly" },
                      { value: "monthly", label: "Monthly" },
                    ]}
                    value={dataForm.dataPlan}
                    onValueChange={(value) =>
                      setDataForm((prev) => ({ ...prev, dataPlan: value }))
                    }
                  />
                  <FormField
                    label="Referral Code (Optional)"
                    type="text"
                    placeholder="Enter referral code"
                    value={dataForm.referralCode}
                    onChange={(e) =>
                      setDataForm((prev) => ({
                        ...prev,
                        referralCode: e.target.value,
                      }))
                    }
                  />
                </div>
                <Button className="mt-8 mx-auto block">Buy Data</Button>
              </TabsContent>

              <TabsContent value="cable" className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Cable TV Operator"
                    type="select"
                    placeholder="Select operator"
                    required
                    options={[
                      { value: "dstv", label: "DSTV" },
                      { value: "gotv", label: "GOTV" },
                      { value: "startimes", label: "StarTimes" },
                    ]}
                    value={cableForm.operator}
                    onValueChange={(value) =>
                      setCableForm((prev) => ({ ...prev, operator: value }))
                    }
                  />
                  <FormField
                    label="Smartcard Number"
                    type="text"
                    placeholder="Enter smartcard number"
                    required
                    value={cableForm.smartcardNumber}
                    onChange={(e) =>
                      setCableForm((prev) => ({
                        ...prev,
                        smartcardNumber: e.target.value,
                      }))
                    }
                  />
                  <FormField
                    label="Amount"
                    type="number"
                    placeholder="Enter amount"
                    min="100"
                    required
                    value={cableForm.amount}
                    onChange={(e) =>
                      setCableForm((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                  />
                  <FormField
                    label="Referral Code (Optional)"
                    type="text"
                    placeholder="Enter referral code"
                    value={cableForm.referralCode}
                    onChange={(e) =>
                      setCableForm((prev) => ({
                        ...prev,
                        referralCode: e.target.value,
                      }))
                    }
                  />
                </div>
                <Button className="mt-8 mx-auto block">Pay Subscription</Button>
              </TabsContent>

              <TabsContent value="electricity" className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Electricity Provider"
                    type="select"
                    placeholder="Select provider"
                    required
                    options={[
                      { value: "ikedc", label: "Ikeja Electric (IKEDC)" },
                      { value: "ekedc", label: "Eko Electric (EKEDC)" },
                      { value: "aedc", label: "Abuja Electric (AEDC)" },
                      {
                        value: "phedc",
                        label: "Port Harcourt Electric (PHEDC)",
                      },
                    ]}
                    value={electricityForm.provider}
                    onValueChange={(value) =>
                      setElectricityForm((prev) => ({
                        ...prev,
                        provider: value,
                      }))
                    }
                  />
                  <FormField
                    label="Package Type"
                    type="select"
                    placeholder="Select package type"
                    required
                    options={[
                      { value: "prepaid", label: "Prepaid Meter" },
                      { value: "postpaid", label: "Postpaid Meter" },
                    ]}
                    value={electricityForm.packageType}
                    onValueChange={(value) =>
                      setElectricityForm((prev) => ({
                        ...prev,
                        packageType: value,
                      }))
                    }
                  />
                  <FormField
                    label="Meter Number"
                    type="text"
                    placeholder="Enter meter number"
                    required
                    value={electricityForm.meterNumber}
                    onChange={(e) =>
                      setElectricityForm((prev) => ({
                        ...prev,
                        meterNumber: e.target.value,
                      }))
                    }
                  />
                  <FormField
                    label="Amount"
                    type="number"
                    placeholder="Enter amount"
                    min="100"
                    required
                    value={electricityForm.amount}
                    onChange={(e) =>
                      setElectricityForm((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                  />
                  <FormField
                    label="Referral Code (Optional)"
                    type="text"
                    placeholder="Enter referral code"
                    value={electricityForm.referralCode}
                    onChange={(e) =>
                      setElectricityForm((prev) => ({
                        ...prev,
                        referralCode: e.target.value,
                      }))
                    }
                  />
                </div>
                <Button className="mt-8 mx-auto block">Pay Bill</Button>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="hidden lg:block w-[25%] relative rounded-md overflow-hidden">
          <Image
            src={RechargeBg}
            alt="Utility Recharge"
            className="h-full w-full object-cover"
            fill
            sizes="20vw"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default RechargeSection;
