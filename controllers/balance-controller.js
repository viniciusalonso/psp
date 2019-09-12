class BalanceController {

    constructor(helper, balanceService) {
        this.helper = helper;
        this.balanceService = balanceService;
    }

    index(request, response) {
        let helper = this.helper;

        this.balanceService.make().then(([results, metadata]) => {
            if (results.length == 0) {
                return helper.formatSuccessResponse(response, {
                    available: '0',
                    waiting_funds: '0'
                });
            }

            return helper.formatSuccessResponse(response, {
                available: results[0].available,
                waiting_funds: results[0].waiting_funds
            });
        });
    }

}

export default BalanceController;
