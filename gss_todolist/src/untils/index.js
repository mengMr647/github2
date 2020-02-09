export default {
        arrSory(array, key,tip) {
                return array.sort(function(a, b) {
                        var x = a[key];
                        var y = b[key];
                        // return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                        if(tip){
                            return x-y;
                        }else{
                            return y-x;
                        }
                        
                })
        }
    
}