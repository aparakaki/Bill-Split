import React from 'react';
import { Image, Text, View, Button, TextInput } from 'react-native';
import Person from "../assets/components/Person";



export default class ImageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalBeforeTax: 0,            //user input total
            currentTotal: null,              //total after plates have been divided
            tax: 0,
            tip: 0,
            tipPercent: 0,
            people: this.props.navigation.state.params.people,
            currentDisplay: 0,
            newItem: null,
            done: false,                    //determines if bill has been split and finalized
            
        }
    }  

    componentDidMount() {
        console.log("start")
        // console.log(this.state.people);
    }

    handleChecked = (id) => {
        console.log(this.state.people[id]);
        console.log(id);
        this.state.people[id].checked = !this.state.people[id].checked
        this.forceUpdate();
        console.log(this.state.people[id]);
        
    }
    addItem = (index) => {
        console.log("add item")
        // console.log("current: " + this.state.currentTotal)
        // console.log("new item: " + this.state.newItem)
        if (this.state.newItem && parseFloat(this.state.newItem) <= parseFloat(this.state.currentTotal)) {
            this.state.people[index].items = this.state.people[index].items.concat(this.state.newItem)
            //this.forceUpdate()
            let total = 0;
            this.state.people[index].items.forEach(item => {
                total += parseFloat(item)
            });
            this.state.people[index].total = total;
            let newTotal = this.state.currentTotal - this.state.newItem;
            this.setState({
                // newItem: null,
                currentTotal: newTotal
            })
        }
        // console.log(this.state.newItem)
        console.log(this.state.people[index]);

    }

    deleteItem = (personId, index) => {
        console.log("delete")
        console.log(personId)
        console.log(index)
        let deletedAmount = parseInt(this.state.people[personId].items[index])
        let newTotal = this.state.currentTotal + deletedAmount
        this.state.people[personId].items.splice(index, 1);
        let personTotal = this.state.people[personId].total - deletedAmount
        this.state.people[personId].total = personTotal
        this.setState({ currentTotal: newTotal })
        console.log(this.state.people[personId].items)
    }

    handleItemChange = (input) => {
        this.setState({ newItem: input })
    }

    nextDisplay = () => {
        let display = this.state.currentDisplay;
        if ((display === 0 && this.state.totalBeforeTax > 0) ||
            display === 1 || display === 2) {
            display += 1;
            this.setState({
                currentDisplay: display
            });
        }
    }

    prevDisplay = () => {
        let display = this.state.currentDisplay - 1;
        this.setState({
            currentDisplay: display
        });
    }

    setTipAmount = (percentage) => {
        let tip = this.state.totalBeforeTax * percentage / 100.0
        this.setState({ tip })
    }

    splitBill = () => {
        console.log("split bill");
        let splitAmount = this.state.currentTotal / this.state.people.length;
        this.state.people.forEach(item => {
            let total = item.total;
            total += splitAmount;
            let taxP = total / this.state.totalBeforeTax;
            let tax = taxP * this.state.tax;
            let tip = this.state.tipPercent / 100 * total;
            total += tax + tip;
            item.total = total;
            item.tax = tax;
            item.tip = tip;
        });

        this.setState({
            people: this.state.people,
            done: true
        })
    }

    reset = () => {
        this.state.people.forEach(item => {
            item.total = 0;
            item.items = []
        });

        this.setState({
            totalBeforeTax: 0,       
            currentTotal: null,             
            tax: 0,
            tip: 0,
            tipPercent: 0,
            people: this.state.people,
            currentDisplay: 0,
            newItem: null,
            done: false             
        })
    }

    render() {
        let inputDisplay;
        if (this.state.currentDisplay === 0) {
            inputDisplay =
                <View>
                    <Text>Total before tax: </Text>
                    <TextInput
                        onChangeText={(input) => this.setState({ totalBeforeTax: input, currentTotal: input })}
                        style={{ backgroundColor: '#afccdb' }}
                        placeholder="0.00"
                        // value={`${this.state.totalBeforeTax}`}
                        keyboardType='numeric'
                        returnKeyType='done'
                    />
                </View>
        }
        else if (this.state.currentDisplay === 1) {
            inputDisplay =
                <View>
                    <Text>Total before tax: {this.state.totalBeforeTax}</Text>
                    <Text>Tax: </Text>
                    <TextInput
                        onChangeText={(input) => this.setState({ tax: input })}
                        style={{ backgroundColor: '#afccdb' }}
                        placeholder="0.00"
                        // value={`${this.state.tax}`}
                        keyboardType='numeric'
                        returnKeyType='done'
                    />
                </View>
        }
        else if (this.state.currentDisplay === 2) {
            inputDisplay =
                <View>
                    <Text>Total before tax: {this.state.totalBeforeTax}</Text>
                    <Text>Tax: {this.state.tax}</Text>
                    <Text>Tip: </Text>
                    <TextInput
                        onChangeText={(input) => { this.setState({ tipPercent: input }); this.setTipAmount(input) }}
                        style={{ backgroundColor: '#afccdb' }}
                        placeholder="Enter Percentage"
                        // value={`${this.state.tipPercent}`}
                        keyboardType='numeric'
                        returnKeyType='done'
                    />
                </View>
        }
        else if (this.state.currentDisplay === 3) {
            inputDisplay =
                <View>
                    <Text>Total before tax: {this.state.totalBeforeTax}</Text>
                    <Text>Tax: {this.state.tax}</Text>
                    <Text>Tip: {this.state.tip}</Text>

                </View>
        }

        let nextBtn;
        if (this.state.currentDisplay < 3) {
            nextBtn =
                <Button
                    title="Next"
                    onPress={this.nextDisplay}
                />
        }
        let prevBtn;
        if (this.state.currentDisplay > 0) {
            prevBtn =
                <Button
                    title="Prev"
                    onPress={this.prevDisplay}
                />
        }

        let splitBtn;
        if (!this.state.done && this.state.currentDisplay === 3 && this.state.currentTotal !== 0) {
            splitBtn =
                <View>
                    <Text>Remaining Amount: {this.state.currentTotal}</Text>
                    <Button
                        title="Split"
                        onPress={this.splitBill}
                    />
                </View>
        }

        let peopleDsp;
        if (this.state.currentDisplay === 3) {
            peopleDsp =
                <View>
                    {this.state.people.map((element, index) => {
                        return <Person
                            key={index}
                            id={index}
                            people={element}
                            currentTotal = {this.state.currentTotal}
                            //newItem = {this.state.newItem}
                            handleItemChange={this.handleItemChange}
                            addItem={() => this.addItem(index)}
                            deleteItem={(personId, index)=> this.deleteItem(personId, index)}
                            checked = {this.state.checked}
                            handleChecked = {(id) => this.handleChecked(id)}
                            selectSplit = {this.state.selectSplit}
                        />
                    })} 
                </View>
        }

        let getTotal;
        if (!this.state.done && this.state.currentTotal === 0) {
            getTotal =
                <Button
                    title="Calculate Totals"
                    onPress={this.splitBill}
                />
        }

        let resetBtn;
        if(this.state.done) {
            resetBtn = 
                <Button
                    title="Reset"
                    onPress={this.reset}
                />
        }

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {inputDisplay}
                <View>
                    {nextBtn}
                    {prevBtn}
                    {splitBtn}
                </View>
                {getTotal}
                {peopleDsp}
                 
                <View>
                    {resetBtn}
                </View> 

            </View>
        );
    }
}