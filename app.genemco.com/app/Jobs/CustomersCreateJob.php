<?php namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Osiset\ShopifyApp\Contracts\Objects\Values\ShopDomain;
use App\GenemcoUsers;
use App\RequestQuoteModel;
use stdClass;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class CustomersCreateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Shop's myshopify domain
     *
     * @var ShopDomain
     */
    public $shopDomain;

    /**
     * The webhook data
     *
     * @var object
     */
    public $data;

    /**
     * Create a new job instance.
     *
     * @param string   $shopDomain The shop's myshopify domain
     * @param stdClass $data    The webhook data (JSON decoded)
     *
     * @return void
     */
    public function __construct($shopDomain, $data)
    {
        $this->shopDomain = $shopDomain;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Do what you wish with the data
        // Access domain name as $this->shopDomain->toNative()

        $data_note = explode(PHP_EOL, $this->data->note);

        if (!is_array($data_note)) {
            return http_response_code(200);
        }

        // ob_start();

        // print_r($this->data);
        // print_r($data_note);

        // Log::info(ob_get_contents());

        // ob_end_clean();

        if (GenemcoUsers::where([['email', '=' , $this->data->email],['user_status', '=' , 'guest']])->get()->count() > 0) {
            GenemcoUsers::where([
                ['email', '=' , $this->data->email],
                ['user_status', '=' , 'guest']
            ])->update(array(
                'user_status'   => 'registered',
                'first_name'    => $this->data->first_name,
                'last_name'     => $this->data->last_name,
                'company_name'  => str_replace("company: ", "", $data_note[0]),
                'email'         => $this->data->email,
                'phone'         => str_replace("phone: ", "", $data_note[1]),
                'city'          => str_replace("city: ", "", $data_note[2]),
                'state'         => str_replace("state: ", "", $data_note[3]),
                'country'       => str_replace("country: ", "", $data_note[4]),
                'preferred_language'    => str_replace("preferred_language: ", "", $data_note[5])
            ));
        } else {
            $genemcoUsers = new GenemcoUsers;

            $genemcoUsers->user_id = md5($this->data->email);
            $genemcoUsers->user_status = 'registered';
            $genemcoUsers->first_name = $this->data->first_name;
            $genemcoUsers->last_name = $this->data->last_name;
            $genemcoUsers->company_name = str_replace("company: ", "", $data_note[0]);
            $genemcoUsers->email = $this->data->email;
            $genemcoUsers->phone = str_replace("phone: ", "", $data_note[1]);
            $genemcoUsers->city = str_replace("city: ", "", $data_note[2]);
            $genemcoUsers->state = str_replace("state: ", "", $data_note[3]);
            $genemcoUsers->country = str_replace("country: ", "", $data_note[4]);
            $genemcoUsers->preferred_language = str_replace("preferred_language: ", "", $data_note[5]);

            $genemcoUsers->save();
        }

        return http_response_code(200);
    }
}
