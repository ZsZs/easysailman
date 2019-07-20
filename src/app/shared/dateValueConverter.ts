import { NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';

export const dateValueConverter: NgrxValueConverter<Date | null, string | null> = {
  convertViewToStateValue(value) {
    if (value === null) {
      return null;
    }

    // the value provided by the date picker is in local time but we want UTC so we recreate the date as UTC
    value = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
    return NgrxValueConverters.dateToISOString.convertViewToStateValue(value);
  },
  convertStateToViewValue: NgrxValueConverters.dateToISOString.convertStateToViewValue,
};
