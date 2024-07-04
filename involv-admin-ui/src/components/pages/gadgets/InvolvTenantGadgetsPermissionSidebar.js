import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { XIcon } from "@heroicons/react/solid";
import { UserService } from "../../../services/api/users/UsersService";
import { borderColor, borderOpacity } from "tailwindcss/defaultTheme";
import { important } from "../../../../tailwind.config";

function InvolvTenantGadgetsPermissionSidebar({
  activeUser,
  setActiveUser,
  selectedRole,
  addNewRole,
  removeRole,
}) {
  const [roles, setRoles] = useState([]);

  useEffect(async () => {
    try {
      const roleOptions = [];
      const allRoles = await UserService.getAllEndUserRoles();
      allRoles?.result?.map((item) =>
        roleOptions.push({ value: item.role, label: item.role })
      );

      setRoles(roleOptions);
    } catch (ex) {
      toast.error(err?.message || "Something went wrong!");
    }
  }, []);
  const getIsRoleAlreadySelected = (value) => {
    // this will check that the passed value is already in the roles array
    const isRoleAlreadySelected = selectedRole?.find(
      (subItem) => subItem === value
    );
    return isRoleAlreadySelected;
  };

  const Svg = (p) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      focusable="false"
      role="presentation"
      {...p}
    />
  );

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <Svg>
          <path
            d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </Svg>
      </components.DropdownIndicator>
    );
  };

  const CustomOption = ({ innerRef, innerProps, isDisabled, children }) =>
    !isDisabled ? (
      <div
        ref={innerRef}
        {...innerProps}
        className={`group hover:bg-indigo-50  hover:border-indigo-900 text-base flex items-center justify-between py-1 px-3  rounded w-full mt-2 ${
          getIsRoleAlreadySelected(children)
            ? "text-indigo-900 border border-indigo-900 font-medium bg-indigo-50"
            : "border border-gray-200 cursor-pointer"
        }`}
      >
        <span className="group-hover:text-indigo-900"> {children}</span>
        {!getIsRoleAlreadySelected(children) ? (
          <img className="w-5" src="/images/plus-icon.svg" />
        ) : (
          ""
        )}
      </div>
    ) : null;

  const onSelectChange = (props) => {
    if (props.value && !getIsRoleAlreadySelected(props.value)) {
      addNewRole([props?.value, ...selectedRole], props.value);
    }
  };

  const roleRemove = (index, role) => {
    const allSelectedRoles = [...selectedRole];
    allSelectedRoles.splice(index, 1);
    setActiveUser("all");
    removeRole(allSelectedRoles, role);
  };

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      color: state.selectProps.menuColor,
      padding: 10,
    }),
  };

  return (
    <div className="w-1/3 border">
      <div className="w-full bg-gray-100 p-5">
        <Select
          components={{
            DropdownIndicator,
            IndicatorSeparator: null,
            Option: CustomOption,
          }}
          classNamePrefix="gadget-role"
          className="gadget-role__input"
          onChange={onSelectChange}
          options={roles}
          value={null}
          placeholder="Search"
          styles={customStyles}
          closeMenuOnSelect={false}
        />
      </div>
      <div className="w-full px-5 pt-2 pb-5 pr-0">
        <div className="flex justify-center">
          <div className="flex flex-col space-y-4 w-full bg-white rounded-lg overflow-y-auto no-scrollbar h-96 pr-5">
            {selectedRole?.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between border border-gray-200 w-full capitalize cursor-pointer rounded ${
                  activeUser === item ? "bg-indigo-200 border-blue-700" : ""
                }`}
              >
                <div
                  className="px-3 py-1.5 2xl:py-2 w-full text-sm 2xl:text-base"
                  key={index}
                  onClick={() => setActiveUser(item)}
                >
                  {item}{" "}
                </div>
                {item?.toLowerCase() !== "all" && (
                  <XIcon
                    className="w-4 h-4 2xl:w-5 2xl:h-5 float-right cursor-pointer mr-2"
                    onClick={() => roleRemove(index, item)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvolvTenantGadgetsPermissionSidebar;
