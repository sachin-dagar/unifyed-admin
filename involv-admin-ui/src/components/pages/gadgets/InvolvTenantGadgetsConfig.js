import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { GadgetService } from "../../../services/api/gadget/GadgetService";
import DynamicForm, { getDynamicFormConfig } from "../../shared/DynamicForm.js";
import { useNavigate } from "react-router";
import InvolvButton from "../../shared/InvolvButton";

function InvolvTenantGadgetsConfig({
  gadgetDetails,
  setGadgetDetails,
  setCurrentTab,
}) {
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [gadgetAttributeMap, setGadgetDetailsadgetAttributeMap] = useState([]);

  useEffect(() => {
    if (gadgetDetails?.gadgetMasterInfo) {
      setGadgetDetailsadgetAttributeMap(
        gadgetDetails?.gadgetMasterInfo?.gadgetAttributeMap || []
      );
    }
  }, [gadgetDetails]);

  const { ConfigSchema, InitialValue } =
    getDynamicFormConfig(gadgetAttributeMap);

  const updateGadgetConfig = async (gadgetInfo) => {
    try {
      setLoading(true);
      const result = await GadgetService.updateGadgetConfig(
        gadgetDetails?._id,
        gadgetInfo
      );
      if (result?.status === 400) {
        throw new Error(result?.data?.errorMessage || "Something went wrong");
      }
      if (result?.gadgetId) {
        setGadgetDetails({ ...gadgetDetails, ...result });
        setCurrentTab("prm");
        toast.success("Gadget Configuration updated successfully!");
      } else {
        toast.error("Something went wrong!");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err?.message || "Something went wrong!");
    }
  };

  return (
    <Formik
      initialValues={{
        ...InitialValue,
        ...gadgetDetails?.tenantGadgetConfiguration,
      }}
      enableReinitialize={true}
      validationSchema={Yup.object().shape(ConfigSchema)}
      onSubmit={(values) => {
        updateGadgetConfig({
          tenantGadgetConfiguration: { ...values },
          tenantDomain: gadgetDetails?.tenantDomain,
          gadgetId: gadgetDetails?.gadgetId,
        });
      }}
    >
      {({
        values,
        errors,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4 mt-7">
            <DynamicForm
              gadgetAttributeMap={gadgetAttributeMap}
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              setFieldValue={setFieldValue}
              defaultValue={InitialValue}
              errors={errors}
            />
          </div>
          <div className="flex mb-5 justify-end mt-5 mb-20 pb-11">
            <InvolvButton
              type="submit"
              loading={loading}
              disabled={loading}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="flex items-center ml-3 inline-block px-12 py-2 bg-blue-600 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Save
            </InvolvButton>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default InvolvTenantGadgetsConfig;
