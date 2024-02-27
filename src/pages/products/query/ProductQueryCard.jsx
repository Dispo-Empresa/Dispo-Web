import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { useState } from "react";

import useFetch from "hooks/useFetchApi";
import Datatable from "components/structured/datatable/Datatable";
import ContentPage from "layouts/content/ContentPage";
import ViewPanel from "layouts/panel/view/ViewPanel";
import ModalCRUD from "components/structured/modal/ModalCRUD";
import ProductRegisterCard from "pages/products/register/ProductRegisterCard";
import ButtonGroup from "components/ui/buttons/group/ButtonGroup";
import { ENDPOINTS } from "utils/constants/endpoints";
import { AbstractFormContextProvider } from "context/abstractFormContext";
import { ProductContextProvider } from "context/contextProduct";
import { GenericDatabaseButton } from "components/ui/buttons/icons/IconButton";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputNumber } from "primereact/inputnumber";
import {
  SelectProductCategory,
  SelectProductUnitOfMeasurement,
} from "components/ui/inputs/select/SelectProduct";
import { CurrencyField } from "components/ui/inputs/currency/CurrencyField";

import "./style.css";
import { categoryTypes, unitOfMeasurementTypes } from "utils/constants/enums";

function ProductQueryCard() {
  //Configuração para o modal funcionar{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [readOnly, setReadOnly] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const viewProducts = (row) => {
    setSelectedRowData(row.id);
    setIsModalOpen(true);
    setReadOnly(true);
    setIsEdit(false);
  };

  const editProducts = (row) => {
    setSelectedRowData(row.id);
    setIsModalOpen(true);
    setReadOnly(false);
    setIsEdit(true);
  };
  //Fim da configuração}

  const balanceFilterTemplate = (options) => {
    return (
      <CurrencyField
        placeholder="R$"
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
      />
    );
  };

  const categoryRowFilterTemplate = (options) => {
    return (
      <SelectProductCategory
        hideLabel
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
      />
    );
  };

  const unitOfMeasurementRowFilterTemplate = (options) => {
    return (
      <SelectProductUnitOfMeasurement
        hideLabel
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
      />
    );
  };

  const filterMatchModes = [
    { label: "Igual", value: FilterMatchMode.EQUALS },
    { label: "Maior que", value: FilterMatchMode.GREATER_THAN },
    { label: "Menor que", value: FilterMatchMode.LESS_THAN },
  ];

  const columns = [
    { field: "name", header: "Nome", minWidth: "350px", filterField: "name" },
    {
      field: "purchasePrice",
      header: "Preço de compra",
      filterElement: balanceFilterTemplate,
      filterMatchModes: filterMatchModes,
    },
    {
      field: "salePrice",
      header: "Preço de venda",
      filterElement: balanceFilterTemplate,
      filterMatchModes: filterMatchModes,
    },
    {
      field: "category",
      header: "Categoria",
      filterElement: categoryRowFilterTemplate,
      enum: categoryTypes,
      hideFilterMatchModes: true,
    },
    {
      field: "unitOfMeasurement",
      header: "Unidade de Peso",
      filterElement: unitOfMeasurementRowFilterTemplate,
      enum: unitOfMeasurementTypes,
      hideFilterMatchModes: true,
    },
  ];

  const deleteTest = (row) => {
    alert("Deletando: " + row.id);
  };

  return (
    <ContentPage id="productView" title="Produtos">
      <Datatable
        noDataMessage="Produtos não encontrados"
        fromApi
        rowsPerPage={[5, 10, 25]}
        columns={columns}
        onDeleteButton={deleteTest}
        onViewButton={viewProducts}
        onEditButton={editProducts}
        entity="Product"
      />

      <AbstractFormContextProvider>
        <ProductContextProvider>
          <ModalCRUD
            isOpen={isModalOpen}
            setShowModal={setIsModalOpen}
            title="Produtos"
          >
            <ProductRegisterCard
              selectedRowData={selectedRowData}
              readOnly={readOnly}
              isEdit={isEdit}
            ></ProductRegisterCard>
          </ModalCRUD>
        </ProductContextProvider>
      </AbstractFormContextProvider>
    </ContentPage>
  );
}

export default ProductQueryCard;
