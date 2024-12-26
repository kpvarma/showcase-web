import React from "react";
import {
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Divider,
    Checkbox,
  } from '@mui/material';

import languageMapping from '../../pages/demos/transliterate/utils/languageMapping';

const DiacriticalMarksTable = ({ inputLanguage, outoutLanguage }) => {
  const {
    vowels,
    consonants,
    joiners,
    modifiers,
    modifiers_two,
    chillu,
    numerals,
    punctuation,
  } = languageMapping(inputLanguage, outoutLanguage);

  const renderTable = (title, data, n) => {
    const entries = Object.entries(data);
    const rows = Math.ceil(entries.length / n); // Calculate the number of rows

    return (
      <div>
        <h4>{title}</h4>
        <Table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "20px" }}>
          <TableBody>
            {Array.from({ length: rows }, (_, rowIndex) => (
              <TableRow key={rowIndex}>
                {entries.slice(rowIndex * n, rowIndex * n + n).map(([malayalam, english], index) => {
                  // Skip this iteration if `english` is empty, null, or blank
                  if (!english || english.trim() === "") {
                    return; // Skip this iteration
                  }

                  return (
                    <TableCell
                      key={index}
                      style={{
                        border: "1px solid black",
                        padding: "10px",
                        textAlign: "center",
                      }}
                    >
                      {malayalam} - <b>{english}</b>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div>
      {renderTable("Vowels (Swaras)", { ...vowels, ...modifiers_two }, 6)}
      {renderTable("Consonants (Vyanjanas)", consonants, 5)}
      {renderTable("Numerals", numerals, 5)}
      {renderTable("Others", { ...chillu, ...modifiers, ...punctuation }, 5)}
    </div>
  );
};

export default DiacriticalMarksTable;