export function formatCurrency(amount: number, options: { showFreeText: boolean }) {
    // Create a formatter for Vietnamese đồng (VND)
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // No decimal places
        maximumFractionDigits: 0, // No decimal places
    });
    if (options?.showFreeText && amount === 0) {
        return 'Miễn phí';
    }
    // const formattedAmount = formatter.format(amount).replace('₫', '').trim() + ' vnđ';
    const formattedAmount = formatter.format(amount);
    return formattedAmount;
}
