import { Diagnostic } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getInlineImplementationsWarnings } from "./diagnostics/getInlineImplementationsWarnings";
import { getMetaWarnings } from "./diagnostics/getMetaWarnings";
import { getUnusedActionImplementations } from "./diagnostics/getUnusedActionImplementations";
import { getUnusedGuardsImplementations } from "./diagnostics/getUnusedGuardImplementations";
import { getUnusedServicesImplementations } from "./diagnostics/getUnusedServicesImplementations";
import { miscDiagnostics } from "./diagnostics/misc";
import { DocumentValidationsResult } from "./server";

export type DiagnosticGetter = (
  result: DocumentValidationsResult,
  textDocument: TextDocument,
) => Diagnostic[];

const getters: DiagnosticGetter[] = [
  miscDiagnostics,
  getUnusedActionImplementations,
  getUnusedServicesImplementations,
  getUnusedGuardsImplementations,
  getInlineImplementationsWarnings,
  getMetaWarnings,
];

export const getDiagnostics = (
  validations: DocumentValidationsResult[],
  textDocument: TextDocument,
): Diagnostic[] => {
  const diagnostics: Diagnostic[] = [];

  validations.forEach((validation) => {
    getters.forEach((getter) => {
      diagnostics.push(...getter(validation, textDocument));
    });
  });

  return diagnostics;
};
