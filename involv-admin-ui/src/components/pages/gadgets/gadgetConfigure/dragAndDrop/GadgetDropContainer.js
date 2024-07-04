import React, { useState, useRef, useEffect } from "react";
import { useDrop } from 'react-dnd'
import { Formik, ErrorMessage, FieldArray, Field, formikProps } from "formik";
import InvolvTenantModal from "../../../../shared/InvolvTenantModal";
import FloatingLabelInput from "../../../../shared/FloatingLabelInput";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/outline";
import Select from "react-select";
import * as Yup from "yup";

function GadgetDropContainer() {
    const formRef = useRef();
    const [openModal, setOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [attributeType, setAttributeType] = useState("");
    const [builderForm, setBuilderForm] = useState([]);
    const [dependentField, setDependentField] = useState(null)
    const [dependentFieldValue, setDependentFieldValue] = useState([])
    const [showWhen, setShowWhen] = useState(null)
    const [showWhenValue, setShowWhenValue] = useState([])
    const [requiredWhen, setrequiredWhen] = useState(null)
    const [collectedProps, drop] = useDrop(() => ({
        accept: 'box',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        drop(_item) {
            setModalTitle(_item.name)
            setAttributeType(_item.type)
            setOpenModal(true)
            setShowWhenValue([])

        }
    }))
    const isActive = collectedProps.canDrop && collectedProps.isOver;
    const handleFormModal = function () {
        setOpenModal(false)
    }
    const handlechange = (e, index, setFieldValue) => {
        setFieldValue(`staticValues.${index}.value`, e.target.value);
        setFieldValue(`staticValues.${index}.key`, e.target.value.toLowerCase().replace(/ /g, ''));
    }
    const handleSubmit = (e) => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    const handleOnChange = (opt) => {
        setShowWhenValue([])
        setDependentField(opt)
        opt.forEach((field) => {
            builderForm.forEach((data) => {
                if (field.key == data.key) {
                    if (data?.staticValues?.length > 0) {
                        setShowWhenValue((dt) => {
                            dt = [...dt, ...data.staticValues]
                            return dt
                        })
                    }
                }
            })
        })
    }
    const handleOnChangeShowWhen = (opt) => {
        setShowWhen(opt)
    }
    const handleOnChangeShowWhenrequired = (opt) => {
        setrequiredWhen(opt)
    }
    const handleDefaultOnChange = (e, setFieldValue) => {
        console.log(e,'checking')
        setFieldValue(`defaultValue`, e.key);
    }
    const duplicateNameCheck = function (field, value) {
        if (field?.length > 0) {
            var valueArr = field.map(function (item) { return item.key });
            if (valueArr.indexOf(value) != -1) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
    const setdefauletValue = function({staticValues , defaultValue}) {
        let defauletData;
        if(staticValues?.length > 0){
            const data = staticValues.forEach((data)=>{
                console.log(data.key , 'defaultValue')
                if(data.key == defaultValue){
                     defauletData = data
                }
            })
            return defauletData;
        }
    }
    const validationSchema = Yup.object().shape({
        displayName: Yup.string().required(`Displayname is required`),
        staticValues: attributeType == 'dropdown' && Yup.array()
            .of(
                Yup.object().shape({
                    value: Yup.string().required('Option is Required'),
                })
            ).required("Required"),
        key: Yup.string().required(`Key is required`).test("Unique", "Key needs to be unique", (values) => {
            return duplicateNameCheck(dependentField, values);
        }),
        infoText: Yup.string().required(`Info Text is required`),
        tooltip: Yup.string().required(`Tooltip is required`)
    })

    return (
        <>
            <div className="flex h-40 2xl:h-48 p-4 rounded border-dashed border border-gray-400 " ref={drop} data-testid="dropBox">
                {builderForm && builderForm.length > 0 ?
                    <div className="grid grid-cols-3 gap-4 w-full">
                        <Formik
                            initialValues={{}}
                        >
                            {({ values }) => (
                                builderForm.map((value, index) => {
                                    return <div key={index}> {
                                        <div className="flex  mt-1">
                                            <div className="w-full">
                                                {
                                                    value.type != 'dropdown' && value.type != 'textarea' ?
                                                        <FloatingLabelInput
                                                            type={value.type}
                                                            name={value.displayName}
                                                            values={values}
                                                            placeholder={value.displayName}
                                                        />
                                                        : value.type == 'dropdown' ?
                                                            <Select
                                                                getOptionLabel={option => option.value}
                                                                getOptionValue={option => option.key}
                                                                options={value.staticValues}
                                                                defaultValue={setdefauletValue(value)}
                                                            />
                                                            : ""
                                                }
                                            </div>
                                        </div>
                                    }
                                    </div>
                                })
                            )}
                        </Formik>
                    </div>
                    : isActive ? <span className="text-sm text-gray-400 w-full  self-center text-center">Release to drop</span> : <span className="text-sm text-gray-400 w-full  self-center text-center">Drag a field and drop to this aria</span>}
            </div>
            <InvolvTenantModal
                openModal={openModal}
                modalTitle={modalTitle}
                buttonTitle="Save"
                handleModal={() => {
                    handleFormModal()
                }}
                submitDataModal={handleSubmit}
                width="xl"
            >
                <div className="w-full">
                    <Formik
                        initialValues={{
                            type: attributeType,
                            displayName: "",
                            key: "",
                            defaultValue: "",
                            staticValues: "",
                            required: false,
                            requiredWhen: requiredWhen,
                            infoText: "",
                            tooltip: "",
                            showWhen: showWhen,
                            showByDefault: true,
                            fieldValidation: null,
                            dependentField: dependentField,
                        }}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={(values, { setSubmitting }) => {
                            { console.log(values) }
                            setDependentFieldValue((dt) => {
                                dt.push({ key: values.key, value: values.key })
                                return dt
                            })
                            setBuilderForm((data) => {
                                data.push({ ...values, dependentField: dependentField, showWhen: showWhen, requiredWhen: requiredWhen })
                                return data
                            })
                            setSubmitting(true);
                            setOpenModal(false)

                        }}
                        validationSchema={validationSchema}
                        innerRef={formRef}

                    >
                        {({ values, handleSubmit, dirty, setFieldValue }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-6 mt-1">
                                    <div className="flex w-96 mt-1">
                                        <div className="w-full">
                                            <FloatingLabelInput
                                                type="text"
                                                name="displayName"
                                                values={values}
                                                placeholder="Label"
                                                autoComplete="off"
                                                autoFocus="off"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="displayName"
                                                className="text-red-500 text-xs mt-px"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-96 mt-1">
                                        <div className="w-full">
                                            <FloatingLabelInput
                                                type="text"
                                                name="key"
                                                placeholder="Key"
                                                values={values}
                                                autoComplete="off"
                                                autoFocus="off"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="key"
                                                className="text-red-500 text-xs mt-px"
                                            />
                                        </div>
                                    </div>
                                    {attributeType == 'dropdown' &&
                                        <FieldArray
                                            name="staticValues"
                                            render={({ push, remove }) => {
                                                return (<>
                                                    <div className="grid gap-3 mt-1">
                                                        <div className="text-sm mb-0 font-semibold">Options</div>
                                                        {values.staticValues?.length > 0 ?
                                                            values.staticValues?.map((option, index) => (
                                                                <div className="flex" key={index}>
                                                                    <div className="flex-1 fle mt-1">
                                                                        <div className="w-full">
                                                                            <FloatingLabelInput
                                                                                type="text"
                                                                                name={`staticValues.${index}.value`}
                                                                                placeholder={`Option ${index + 1}`}
                                                                                values={values}
                                                                                autoComplete="off"
                                                                                autoFocus="off"
                                                                                onChange={(e) => handlechange(e, index, setFieldValue)}
                                                                            />
                                                                            <ErrorMessage
                                                                                component="div"
                                                                                name={`staticValues.${index}.value`}
                                                                                className="text-red-500 text-xs mt-px"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    {index > 0 &&
                                                                        <button
                                                                            type="button"
                                                                            className="ml-2"
                                                                            onClick={() => remove(index)}
                                                                        >
                                                                            <TrashIcon className="h-5 w-5" />
                                                                        </button>
                                                                    }

                                                                </div>
                                                            ))
                                                            : <div className="flex-1 fle mt-1">
                                                                <div className="w-full">
                                                                    <FloatingLabelInput
                                                                        type="text"
                                                                        name={`staticValues.${0}.value`}
                                                                        placeholder={`Option ${0 + 1}`}
                                                                        values={values}
                                                                        autoComplete="off"
                                                                        autoFocus="off"
                                                                        onChange={(e) => handlechange(e, 0, setFieldValue)}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name={`staticValues.${0}.value`}
                                                                        className="text-red-500 text-xs mt-px"
                                                                    />
                                                                </div>
                                                            </div>}
                                                        <button
                                                            type="button"
                                                            className="flex justify-end w-full pr-2 cursor-default"
                                                        >
                                                            <span
                                                                className="flex text-blue-700 text-sm items-center cursor-pointer"
                                                                onClick={() => push({ key: "", value: "" })}
                                                            >
                                                                <PlusCircleIcon className="h-6 w-6" />Add Option
                                                            </span>
                                                        </button>
                                                    </div>
                                                </>)
                                            }}
                                        />
                                    }
                                    {attributeType == 'dropdown' && values.staticValues.length > 0 &&
                                        <Select
                                            getOptionLabel={option => option.value}
                                            getOptionValue={option => option.key}
                                            options={values.staticValues}
                                            name="defaultValue"
                                            onChange={(e) => handleDefaultOnChange(e , setFieldValue)}
                                        />
                                    }
                                    {attributeType != 'dropdown' &&
                                        <div className="flex w-96 mt-1">
                                            <div className="w-full">
                                                <FloatingLabelInput
                                                    type="text"
                                                    name="defaultValue"
                                                    placeholder="Default Value"
                                                    values={values}
                                                    autoComplete="off"
                                                    autoFocus="off"
                                                />
                                            </div>
                                        </div>
                                    }
                                    <div className="flex w-96 mt-1">
                                        <div className="w-full">
                                            <FloatingLabelInput
                                                type="text"
                                                name="infoText"
                                                placeholder="Info Text"
                                                values={values}
                                                autoComplete="off"
                                                autoFocus="off"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="infoText"
                                                className="text-red-500 text-xs mt-px"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-96 mt-1">
                                        <div className="w-full">
                                            <FloatingLabelInput
                                                type="text"
                                                name="tooltip"
                                                placeholder="Tool Tip"
                                                values={values}
                                                autoComplete="off"
                                                autoFocus="off"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                name="tooltip"
                                                className="text-red-500 text-xs mt-px"
                                            />
                                        </div>
                                    </div>
                                    {dependentFieldValue?.length > 0 &&
                                        <div className="flex w-96 mt-1">
                                            <div className="w-full">
                                                <Select
                                                    isMulti
                                                    name="dependentField"
                                                    getOptionLabel={option => option.value}
                                                    getOptionValue={option => option.key}
                                                    options={dependentFieldValue}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={handleOnChange}
                                                    closeMenuOnSelect={false}
                                                />
                                            </div>
                                        </div>
                                    }
                                    {showWhenValue?.length > 0 &&
                                        <div className="flex w-96 mt-1">
                                            <div className="w-full">
                                                <Select
                                                    isMulti
                                                    name="showWhen"
                                                    getOptionLabel={option => option.value}
                                                    getOptionValue={option => option.key}
                                                    options={showWhenValue}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    closeMenuOnSelect={false}
                                                    onChange={handleOnChangeShowWhen}
                                                />
                                            </div>
                                        </div>
                                    }
                                    {showWhen?.length > 0 &&
                                        <div className="flex w-96 mt-1">
                                            <div className="w-full">
                                                <Select
                                                    isMulti
                                                    name="requiredWhen"
                                                    getOptionLabel={option => option.value}
                                                    getOptionValue={option => option.key}
                                                    options={showWhen}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    closeMenuOnSelect={false}
                                                    onChange={handleOnChangeShowWhenrequired}
                                                />
                                            </div>
                                        </div>
                                    }
                                    <div className="flex w-96 mt-1">
                                        <div className="w-full">
                                            <label className="block text-gray-400" htmlFor="required">
                                                <Field
                                                    type="checkbox"
                                                    name="required"
                                                    values={values}
                                                    autoComplete="off"
                                                    autoFocus="off"
                                                />
                                                <span className="ml-5">Required</span>
                                            </label>
                                            <ErrorMessage
                                                component="div"
                                                name="required"
                                                className="text-red-500 text-xs mt-px"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </InvolvTenantModal>
        </>
    )
}

export default GadgetDropContainer;