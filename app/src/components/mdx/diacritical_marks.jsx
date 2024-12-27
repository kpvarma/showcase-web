import React from "react";
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Divider,
  } from '@mui/material';

import { useTheme } from '@mui/material/styles';

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

    // Access the current theme
    const theme = useTheme();

    const renderTable = (title, data, n) => {
        const entries = Object.entries(data);
        const rows = Math.ceil(entries.length / n); // Calculate the number of rows

        // const borderColor = theme.palette.mode === 'dark' ? '#d7d7d7' : '#898989'
        // const textColor = theme.palette.mode === 'dark' ? 'yellow' : '#4b4b4b'

        return (
        <div>
            <Typography component="span" variant="body" sx={{ fontWeight: "inherit", p: "0px !important", color: '#898989' }}>
                {title}<br></br>
            </Typography>
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
                                border: `1px solid hsla(220, 20%, 25%, 0.6)`,
                                backgroundColor: 'hsl(220, 30%, 7%)',
                                padding: "10px",
                                textAlign: "center",
                                color: '#fff',
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