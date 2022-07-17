import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import { countries } from 'country-data-list';

const preparedCountryList = countries.all.filter(country => country.status === 'assigned');

function countryComparator(a,b, regionNames, locale) {
    return regionNames.of(a.alpha2).localeCompare(regionNames.of(b.alpha2), locale);
}

export function CountryPicker(props) {
    const { langOfCountryName, ...restTextFieldProps } = props;
    const locale = langOfCountryName ? langOfCountryName : 'en';
    const regionNames = new Intl.DisplayNames([locale], { type: 'region' });
    
    return (
        <TextField {...restTextFieldProps} select>{preparedCountryList.sort((a,b) => countryComparator(a, b, regionNames, locale)).map((country) => 
            <MenuItem key={country.alpha3} value={country.alpha3}>{(country.emoji ? country.emoji + ' ' : '') + regionNames.of(country.alpha2)}</MenuItem>)}
        </TextField>
    );
}
