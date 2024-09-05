const DateFormat = (props) => {
    const getDate = props.date;
    const { pageName } = props;
    const cls = props.class;
    function ordinal(d) {
        const nth = { 1: 'st', 2: 'nd', 3: 'rd' };
        return `${d}${nth[d] || 'th'}`;
    }
    function DateFormatChange(strDate) {
        const strSplitDate = String(strDate).split(' ');
        let date = new Date(strSplitDate[0]);
        let dd = date.getDate();
        let mm = date.getMonth() + 1; // January is 0!
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
        const yyyy = date.getFullYear();
        if (dd < 10) {
            dd = `0${dd}`;
        }
        if (mm < 10) {
            mm = `0${mm}`;
        }
        if (pageName === 'BlogSingle') {
            date = `${monthNames[date.getMonth()]} ${ordinal(date.getDate())}, ${yyyy}`;
        } else {
            date = `${mm}/${dd}/${yyyy}`;
        }

        return date.toString();
    }

    return (
        <p className={cls}>
            {DateFormatChange(getDate)}
        </p>
    );
};

export default DateFormat;
