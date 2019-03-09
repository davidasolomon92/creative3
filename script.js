let app = new Vue({
  el: '#app',
  data: {
    search_text: '',
    message: '',
    error: false,
    number: '1',
    min: 1,
    max: 151,
    current: {
      name: '',
      id: '',
      sprites: '',
      height: '',
      weight: '',
      types: '',
    },
    loading: true,
  },
  created() {
    this.searchNum();
  },
  computed: {
    typeColor() {
      var color = new Array;
      if (this.current.month === undefined)
        return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    },

  },
  watch: {
    number(value, oldvalue) {
      this.searchNum();
    },
    current() {
      this.current.name = this.capitalize(this.current.name);
      for (var i = 0; i < this.current.types.length; i++) {
        this.current.types[i].type.name = this.capitalize(this.current.types[i].type.name)
      }
    },
  },
  methods: {
    async search() {
      try {
        this.loading = true;
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + this.search_text);
        this.current = response.data;
        this.loading = false;
        this.error = false;;
        return true;
      } catch (error) {
        this.error = true;
        this.message = 'Not Found';
        console.log(error);
      }
    },
    async searchNum() {
      try {
        console.log("in searchNum" + this.number);
        this.loading = true;
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + this.number);
        console.log(response);
        this.current = response.data;
        this.loading = false;

        return true;
      } catch (error) {
        this.number = this.min;
        console.log(error);
      }
    },
    previousPoke() {
      this.number = this.current.id - 1;
      if (this.number < 1)
        this.number = 1;
    },
    nextPoke() {
      this.number = this.current.id + 1;
      if (this.number > this.max)
        this.number = this.max
    },
    randomPoke() {
      min = Math.ceil(this.min);
      max = Math.floor(this.max);
      var temp = Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
      this.number = temp;
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

  },

});