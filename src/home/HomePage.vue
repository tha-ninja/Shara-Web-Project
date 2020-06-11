<template>
<div>
<p>
            <router-link to="/login" class="btn btn-danger">Logout</router-link>
        </p>
<div class="container">
	<div class="row">
    <div class="col-md-6">
		<table class="table table-bordered">
    <thead>
      <tr>
        <th>Order No.</th>
        
      </tr>
    </thead>
    <tbody>

 
     
    </tbody>
  </table>
	</div>

<div class="col-md-6">
		<table class="table table-bordered">
    <thead>
      <tr>
        <th>Order Details</th>
        
      </tr>
    </thead>
    <tbody>
     
     
    </tbody>
  </table>
	</div>

</div>
</div>
    
        
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.all,
            
        })
    },
    created () {
        this.getAllOrders();
    },
    methods: {
        ...mapActions('users', {
            getAllOrders: 'getAll',
            deleteUser: 'delete'
        })
    }
};
</script>