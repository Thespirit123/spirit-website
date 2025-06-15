import RechargeBg from "@/assets/images/recharge.jpg";
import Button from "@/components/custom-ui/button";
import { FormField } from "@/components/custom-ui/form-field";
import { Text } from "@/components/custom-ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { FaBolt, FaPhone, FaTv, FaWifi } from "react-icons/fa";

// interface UtilityFormData {
//   airtime: UtilityProductItem[];
//   data: UtilityProductItem[];
//   cable: UtilityProductItem[];
//   electricity: UtilityProductItem[];
// }

const RechargeSection = () => {
  // const [activeTab, setActiveTab] = useState<UtilityType>("airtime");
  // const { data, isLoading } = useUtilityProducts(activeTab);
  // const [utilityProducts, setUtilityProducts] = useState<UtilityFormData>({
  //   airtime: [],
  //   data: [],
  //   cable: [],
  //   electricity: [],
  // });

  // useEffect(() => {
  //   console.log("utilityProducts", utilityProducts);
  // }, [utilityProducts]);

  // useEffect(() => {
  //   if (data) {
  //     setUtilityProducts((prev) => ({
  //       ...prev,
  //       [activeTab]: data,
  //     }));
  //   }
  // }, [data, activeTab]);

  // const networkProviderOptions = useMemo(() => {
  //   return utilityProducts.airtime.map((item) => ({
  //     value: item.product_id.toString(),
  //     label: item.product, // Keep original name with VTU
  //   }));
  // }, [utilityProducts.airtime]);

  // const handleTabChange = (value: string) => {
  //   setActiveTab(value as UtilityType);
  // };

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
                  />
                  <FormField
                    label="Amount"
                    type="number"
                    placeholder="Enter amount"
                    min="100"
                    required
                  />
                  <FormField
                    label="Referral Code (Optional)"
                    type="text"
                    placeholder="Enter referral code"
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
                  />
                  <FormField
                    label="Referral Code (Optional)"
                    type="text"
                    placeholder="Enter referral code"
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
                  />
                  <FormField
                    label="Smartcard Number"
                    type="text"
                    placeholder="Enter smartcard number"
                    required
                  />
                  <FormField
                    label="Amount"
                    type="number"
                    placeholder="Enter amount"
                    min="100"
                    required
                  />
                  <FormField
                    label="Referral Code (Optional)"
                    type="text"
                    placeholder="Enter referral code"
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
                  />
                  <FormField
                    label="Meter Number"
                    type="text"
                    placeholder="Enter meter number"
                    required
                  />
                  <FormField
                    label="Amount"
                    type="number"
                    placeholder="Enter amount"
                    min="100"
                    required
                  />
                  <FormField
                    label="Referral Code (Optional)"
                    type="text"
                    placeholder="Enter referral code"
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
