/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { listCategories, listGenres } from "../../src/graphql/queries";
import { createProduct } from "../../src/graphql/mutations";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function ProductCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    isSold: false,
    price: "",
    image: "",
    categoryID: undefined,
    genreID: undefined,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [isSold, setIsSold] = React.useState(initialValues.isSold);
  const [price, setPrice] = React.useState(initialValues.price);
  const [image, setImage] = React.useState(initialValues.image);
  const [categoryID, setCategoryID] = React.useState(initialValues.categoryID);
  const [categoryIDLoading, setCategoryIDLoading] = React.useState(false);
  const [categoryIDRecords, setCategoryIDRecords] = React.useState([]);
  const [selectedCategoryIDRecords, setSelectedCategoryIDRecords] =
    React.useState([]);
  const [genreID, setGenreID] = React.useState(initialValues.genreID);
  const [genreIDLoading, setGenreIDLoading] = React.useState(false);
  const [genreIDRecords, setGenreIDRecords] = React.useState([]);
  const [selectedGenreIDRecords, setSelectedGenreIDRecords] = React.useState(
    []
  );
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setIsSold(initialValues.isSold);
    setPrice(initialValues.price);
    setImage(initialValues.image);
    setCategoryID(initialValues.categoryID);
    setCurrentCategoryIDValue(undefined);
    setCurrentCategoryIDDisplayValue("");
    setGenreID(initialValues.genreID);
    setCurrentGenreIDValue(undefined);
    setCurrentGenreIDDisplayValue("");
    setErrors({});
  };
  const [currentCategoryIDDisplayValue, setCurrentCategoryIDDisplayValue] =
    React.useState("");
  const [currentCategoryIDValue, setCurrentCategoryIDValue] =
    React.useState(undefined);
  const categoryIDRef = React.createRef();
  const [currentGenreIDDisplayValue, setCurrentGenreIDDisplayValue] =
    React.useState("");
  const [currentGenreIDValue, setCurrentGenreIDValue] =
    React.useState(undefined);
  const genreIDRef = React.createRef();
  const getDisplayValue = {
    categoryID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    genreID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [],
    isSold: [],
    price: [],
    image: [],
    categoryID: [{ type: "Required" }],
    genreID: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const fetchCategoryIDRecords = async (value) => {
    setCategoryIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ name: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listCategories,
          variables,
        })
      )?.data?.listCategories?.items;
      var loaded = result.filter((item) => categoryID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setCategoryIDRecords(newOptions.slice(0, autocompleteLength));
    setCategoryIDLoading(false);
  };
  const fetchGenreIDRecords = async (value) => {
    setGenreIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ name: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await API.graphql({
          query: listGenres,
          variables,
        })
      )?.data?.listGenres?.items;
      var loaded = result.filter((item) => genreID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setGenreIDRecords(newOptions.slice(0, autocompleteLength));
    setGenreIDLoading(false);
  };
  React.useEffect(() => {
    fetchCategoryIDRecords("");
    fetchGenreIDRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          isSold,
          price,
          image,
          categoryID,
          genreID,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createProduct,
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProductCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              isSold,
              price,
              image,
              categoryID,
              genreID,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <SwitchField
        label="Is sold"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isSold}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              isSold: value,
              price,
              image,
              categoryID,
              genreID,
            };
            const result = onChange(modelFields);
            value = result?.isSold ?? value;
          }
          if (errors.isSold?.hasError) {
            runValidationTasks("isSold", value);
          }
          setIsSold(value);
        }}
        onBlur={() => runValidationTasks("isSold", isSold)}
        errorMessage={errors.isSold?.errorMessage}
        hasError={errors.isSold?.hasError}
        {...getOverrideProps(overrides, "isSold")}
      ></SwitchField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              isSold,
              price: value,
              image,
              categoryID,
              genreID,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              isSold,
              price,
              image: value,
              categoryID,
              genreID,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              isSold,
              price,
              image,
              categoryID: value,
              genreID,
            };
            const result = onChange(modelFields);
            value = result?.categoryID ?? value;
          }
          setCategoryID(value);
          setCurrentCategoryIDValue(undefined);
        }}
        currentFieldValue={currentCategoryIDValue}
        label={"Category id"}
        items={categoryID ? [categoryID] : []}
        hasError={errors?.categoryID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("categoryID", currentCategoryIDValue)
        }
        errorMessage={errors?.categoryID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.categoryID(
                categoryIDRecords.find((r) => r.id === value) ??
                  selectedCategoryIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentCategoryIDDisplayValue(
            value
              ? getDisplayValue.categoryID(
                  categoryIDRecords.find((r) => r.id === value) ??
                    selectedCategoryIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentCategoryIDValue(value);
          const selectedRecord = categoryIDRecords.find((r) => r.id === value);
          if (selectedRecord) {
            setSelectedCategoryIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={categoryIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Category id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Category"
          value={currentCategoryIDDisplayValue}
          options={categoryIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.categoryID?.(r),
            }))}
          isLoading={categoryIDLoading}
          onSelect={({ id, label }) => {
            setCurrentCategoryIDValue(id);
            setCurrentCategoryIDDisplayValue(label);
            runValidationTasks("categoryID", label);
          }}
          onClear={() => {
            setCurrentCategoryIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchCategoryIDRecords(value);
            if (errors.categoryID?.hasError) {
              runValidationTasks("categoryID", value);
            }
            setCurrentCategoryIDDisplayValue(value);
            setCurrentCategoryIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("categoryID", currentCategoryIDValue)
          }
          errorMessage={errors.categoryID?.errorMessage}
          hasError={errors.categoryID?.hasError}
          ref={categoryIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "categoryID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              name,
              isSold,
              price,
              image,
              categoryID,
              genreID: value,
            };
            const result = onChange(modelFields);
            value = result?.genreID ?? value;
          }
          setGenreID(value);
          setCurrentGenreIDValue(undefined);
        }}
        currentFieldValue={currentGenreIDValue}
        label={"Genre id"}
        items={genreID ? [genreID] : []}
        hasError={errors?.genreID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("genreID", currentGenreIDValue)
        }
        errorMessage={errors?.genreID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.genreID(
                genreIDRecords.find((r) => r.id === value) ??
                  selectedGenreIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentGenreIDDisplayValue(
            value
              ? getDisplayValue.genreID(
                  genreIDRecords.find((r) => r.id === value) ??
                    selectedGenreIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentGenreIDValue(value);
          const selectedRecord = genreIDRecords.find((r) => r.id === value);
          if (selectedRecord) {
            setSelectedGenreIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={genreIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Genre id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Genre"
          value={currentGenreIDDisplayValue}
          options={genreIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.genreID?.(r),
            }))}
          isLoading={genreIDLoading}
          onSelect={({ id, label }) => {
            setCurrentGenreIDValue(id);
            setCurrentGenreIDDisplayValue(label);
            runValidationTasks("genreID", label);
          }}
          onClear={() => {
            setCurrentGenreIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchGenreIDRecords(value);
            if (errors.genreID?.hasError) {
              runValidationTasks("genreID", value);
            }
            setCurrentGenreIDDisplayValue(value);
            setCurrentGenreIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("genreID", currentGenreIDValue)}
          errorMessage={errors.genreID?.errorMessage}
          hasError={errors.genreID?.hasError}
          ref={genreIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "genreID")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
