(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("VETable/lang/enUS", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.VETable = global.VETable || {};
    global.VETable.lang = global.VETable.lang || {};
    global.VETable.lang.enUS = mod.exports.default;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    pagination: {
      goto: "Ir a",
      page: "",
      itemsPerPage: " / página",
      total: function total(_total) {
        return "Total " + _total;
      },
      prev5: "5 páginas anteriores",
      next5: "5 páginas siguientes"
    },
    table: {
      confirmFilter: "Confirmar",
      resetFilter: "Restablecer",
      cut: "Cortar",
      copy: "Copiar",
      insertRowAbove: "Insertar fila arriba",
      insertRowBelow: "Insertar fila a continuación",
      removeRow: "Eliminar $1 fila",
      emptyRow: "Vacio $1 fila",
      emptyColumn: "Vacio $1 columna",
      emptyCell: "Celda vacía",
      leftFixedColumnTo: "Columna fija izquierda a",
      cancelLeftFixedColumnTo: "Cancelar columna fija izquierda a",
      rightFixedColumnTo: "Columna fija derecha a",
      cancelRightFixedColumnTo: "Cancelar columna fija derecha a"
    }
  };
  _exports.default = _default;
});
