import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Alert } from "react-native";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { validateStep1, validateStep2 } from "./formValidation";

const SignUp = () => {
  const { setUser } = useGlobalContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthdayDate: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const nextStep = () => {
    let stepErrors = {};
    if (currentStep === 1) {
      stepErrors = validateStep1(form);
    } else if (currentStep === 2) {
      stepErrors = validateStep2(form);
    }

    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep((prev) => prev + 1);
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const submit = async () => {
    const stepErrors = validateStep2(form);
    if (Object.keys(stepErrors).length > 0) {
      console.log("Validation errors:", stepErrors);
      setErrors(stepErrors);
      return;
    }

    setSubmitting(true);
    try {
      const result = await createUser({
        email: form.email,
        password: form.password,
        username: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
        birthdayDate: form.birthdayDate,
      });

      setUser(result);
      nextStep(); // Move to Step 3 after successful sign-up
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        {currentStep === 1 && (
          <Step1
            form={form}
            setForm={setForm}
            errors={errors}
            isSubmitting={isSubmitting}
            nextStep={nextStep}
          />
        )}
        {currentStep === 2 && (
          <Step2
            form={form}
            setForm={setForm}
            errors={errors}
            isSubmitting={isSubmitting}
            prevStep={prevStep}
            submit={submit}
          />
        )}
        {currentStep === 3 && <Step3 nextStep={nextStep} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
