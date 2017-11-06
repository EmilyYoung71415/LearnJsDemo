/*创建一个列表类*/
function List() { 
    this.listSize =0;//列表中的元素个数
    this.pos =0;//列表的当前位置
    this.dataStore =[];//初始化一个空数组来保存列表元素
    this.clear = clear;//清空列表
    this.find = find;//
    this.toString = toString;//返回列表的字符串形式
    this.insert = insert;//在现有元素中插入新元素
    this.append = append;//在列表末尾添加元素
    this.remove = remove;//删除元素
    this.length = length; //列表元素个数
    this.front = front;//将列表的当前位置移动到第一个元素
    this.end = end; //当前位置移动到最后一个元素
    this.prev = prev; //当前位置后移一位
    this.next = next;//当前位置前移一位
    this.currPos = currPos; //返回列表的当前位置
    this.moveTo = moveTo; //当前位置移动到指定位置
    this.getElement = getElement;//返回当前位置的元素 
    this.length = length;
    this.contains = contains;//判断给定值是否在列表中
}

//给列表添加元素
function append(element) {
    this.dataStore[this.listSize++] = element;
}

//从列表中查找某个元素
function find(element) {
    for (var i = 0; i < this.dataStore.length; ++i) { 
        if (this.dataStore[i] == element) { 
            return i;
        }
    }
    return -1;
}

//从列表中删除某个元素
function remove(element) {
    var foundAt = this.find(element); 
    if (foundAt > -1) {
        this.dataStore.splice(foundAt,1);
        --this.listSize; 
        return true;//删除成功返回true
    }
    return false;//失败返回false
}

//列表中有多少个元素
function length() {
    return this.listSize;
}

//显示列表中的元素
function toString() { 
    return this.dataStore;
}
//向列表中插入元素
function insert(element, after) {
    var insertPos = this.find(after); 
    if (insertPos > -1) {
        this.dataStore.splice(insertPos+1, 0, element);
        ++this.listSize;
        return true;
    }
    return false;
}
//清空列表中的所有元素
function clear() {
    delete this.dataStore; //删除数组再创建个空数组
    this.dataStore =[]; 
    this.listSize = this.pos = 0;
}
//判断给定值是否在列表中
function contains(element) {
    for (var i = 0; i < this.dataStore.length; ++i) { 
        if (this.dataStore[i] == element) {
            return true;
        }
    }
    return false;
}

//遍历列表 允许用户在列表上自由移动
function front() { //移到第一位
    this.pos =0;
}
function end() { //移到最后一位
    this.pos = this.listSize-1;
}
function prev() { //前移一位
    if (this.pos >0) {
        --this.pos;
    }
}
function next() {
    if (this.pos < this.listSize-1) {
        ++this.pos;
    }
}
function currPos() { 
    return this.pos;
}
function moveTo(position) {//移到指定位置 
    this.pos = position;
} 
function getElement() {//获取当前位置元素
    return this.dataStore[this.pos];
}



var names = new List();
names.append('yxy');
names.append('ahhahah');
names.append('txt');
//print(names.toString());//["yxy", "ahhahah", "txt"]
//print(names.remove('yxy'));//true
//print(names.toString());//["ahhahah", "txt"]
names.append('111111');
names.append('222222');
print(names.toString());//["ahhahah", "txt", "111111", "222222"]
// names.end();//2222222
//names.next();
//names.next();
//names.prev();
//print(names.getElement());//txt

//使用迭代器遍历整个列表
//与数组索引相比，迭代器的优点:当列表添加元素时，索引不对，此时只用更新列表不用更新迭代器
for(names.end(); names.currPos() >= 0; names.prev())
{
    print(names.getElement());
}

/*基于列表的应用*/
//读取文件
//var movies = read(films.txt).split("\n");
function createArr(file) {
    var arr = read(file).split("\n"); 
    for (var i = 0; i < arr.length; ++i) { 
        arr[i] = arr[i].trim();
    }
    return arr;
}

//显示租赁店里现有的影碟清单
/*function displayList(list) {
    for (list.front(); list.currPos() < list.length(); list.next()) { 
        print(list.getElement());
    }
}*/
//改之，加个Customer对象，可以对应地对其展示[如只展示客户租赁的]
function displayList(list) {
    for (list.front(); list.currPos() < list.length(); list.next()) { 
        if (list.getElement() instanceof Customer){ 
            //判断对象是否由Customer构造函数创建出来的
            print(list.getElement()["name"] + ", " + list.getElement()["movie"]);
            //使用name和movie做索引，得到客户检出的相应条目的值
        }else {
            print(list.getElement());
        }
    }
}

//Customer对象,对象由用户姓名和检出的电影组成
function Customer(name, movie) { 
    this.name = name; 
    this.movie = movie;
}

//允许客户检出电影的函数 参数[客户姓名,客户想要检出的电影]
function checkOut(name, movie, filmList, customerList) { 
    if (movieList.contains(movie)) {//如果当前movie可以租赁
        var c = new Customer(name, movie); 
        customerList.append(c);//加入客户列表
        filmList.remove(movie);//同时从库存清单中删除该电影
    }else {
        print(movie + " is not available.");  
    }   
}

//测试下检出电影函数
var movies = createArr('film.txt');
var movieList = new List(); 
var customers = new List();//客户列表 存储在系统中检出的电影用户
for (var i = 0; i <3; ++i){
    //print(movies[i]);
     movieList.append(movies[i]);
}
print("Available movies:\n ");
displayList(movieList);
/*checkOut("Jane Doe", "hello", movieList, customers);
print("Customer Rentals:\n ");
displayList(customers);*/
